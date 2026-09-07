import { NextRequest, NextResponse } from "next/server";
import { htmlPath } from "@/lib/html-url";

// Cheap presence check only: if a session cookie exists, let the request
// through and let the server-side `auth()` in AdminLayout do the real
// validation. Edge-runtime JWT decoding was flaky and was kicking signed-in
// users back to /admin/login even when the server saw a valid session.
const SESSION_COOKIE_NAMES = [
  "ti_admin_session", // primary — our own HMAC cookie, immune to NextAuth hiccups
  "__Secure-authjs.session-token",
  "authjs.session-token",
];

// Legacy Magento catalogue URLs from the old tertiarycourses.com.sg storefront
// that Google still has indexed against this domain (~3k of them). They 404
// here but are live on the .com.sg site, so 301 them across instead of burning
// crawl budget on not-found pages.
//
// The rule is inverted on purpose: this site's own routes are a small, known
// set, and the legacy catalogue is a long tail of thousands of product and
// category slugs. So we allowlist what belongs here and hand everything else
// that looks like an old Magento ".html" URL to the .com.sg host.
const LEGACY_CATALOGUE_HOST = "https://www.tertiarycourses.com.sg";

// Top-level routes owned by THIS site. Kept in sync with src/app/*.
const OWN_ROUTES = new Set([
  "/",
  "/advanced-certificate-in-agentic-ai-coding",
  "/advanced-certificate-in-ai-security-analyst",
  "/advanced-certificate-in-blockchain",
  "/ai-agent-deployment",
  "/ai-chatbot-portfolio",
  "/ai-solutions",
  "/blog",
  "/contact",
  "/content-management-system",
  "/courses",
  "/edtools",
  "/hr-management-system",
  "/learning-management-system",
  "/pei-course-submission",
  "/privacy",
  "/real-clients",
  "/ssg-ato-application",
  "/study-in-singapore",
  "/terms",
  "/tpqa-consultancy",
  "/training-management-system",
  "/wsq-course-development",
]);

// Route namespaces owned by this site (CMS pages, posts, courses, edtools).
const OWN_PREFIXES = ["/blog/", "/courses/", "/edtools/"];

// The old Magento theme rendered Material-Icons ligatures as text, so Google
// crawled many URLs with private-use codepoints (U+E000-U+F8FF) glued onto the
// end. Those 404 on both domains — strip them before matching and redirecting.
const PRIVATE_USE_SUFFIX = /[\uE000-\uF8FF]+$/;

function legacyCatalogueTarget(pathname: string): string | null {
  let decoded: string;
  try {
    decoded = decodeURIComponent(pathname);
  } catch {
    decoded = pathname; // malformed escape sequence — match on the raw path
  }
  const cleaned = decoded.replace(PRIVATE_USE_SUFFIX, "");

  // Only ever redirect the old storefront's ".html" URL shape.
  if (!cleaned.endsWith(".html")) return null;

  const base = cleaned.slice(0, -5);
  if (OWN_ROUTES.has(base)) return null;
  if (OWN_PREFIXES.some((prefix) => base.startsWith(prefix))) return null;

  return `${LEGACY_CATALOGUE_HOST}${cleaned}`;
}

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only a request that literally arrived as "…​.html" can be a legacy Magento
  // URL. Checking the raw pathname here (rather than after the bare-path →
  // .html rewrite below) keeps an unknown bare path such as /some-typo on this
  // domain, where it gets our own 404, instead of bouncing it to a 404 on the
  // .com.sg host.
  if ((req.method === "GET" || req.method === "HEAD") && pathname.includes(".html")) {
    const legacyTarget = legacyCatalogueTarget(pathname);
    if (legacyTarget) {
      return new NextResponse(null, {
        status: 301,
        headers: {
          location: `${legacyTarget}${req.nextUrl.search}`,
          "cache-control": "no-cache",
        },
      });
    }
  }

  const isPublicPageRequest =
    !pathname.startsWith("/admin") &&
    !pathname.startsWith("/api") &&
    !pathname.startsWith("/_next") &&
    pathname !== "/robots.txt" &&
    pathname !== "/sitemap.xml" &&
    pathname !== "/opengraph-image" &&
    !pathname.includes(".");

  if ((req.method === "GET" || req.method === "HEAD") && isPublicPageRequest) {
    const target = htmlPath(pathname);
    // Don't manufacture a .html URL for a path we don't own — that would feed
    // the legacy rule above on the follow-up request and bounce a simple typo
    // off to the .com.sg host. Let it 404 here instead.
    if (target !== pathname && legacyCatalogueTarget(target) !== null) {
      return NextResponse.next({
        request: { headers: new Headers(req.headers) },
      });
    }
    if (target !== pathname) {
      const url = req.nextUrl.clone();
      url.pathname = target;
      // Browsers cache bare 301s forever; force revalidation so a future
      // change to the URL scheme doesn't leave stale redirects in browsers.
      return new NextResponse(null, {
        status: 301,
        headers: { location: url.toString(), "cache-control": "no-cache" },
      });
    }
  }

  const canRewriteHtml =
    !pathname.startsWith("/admin") &&
    !pathname.startsWith("/api") &&
    !pathname.startsWith("/_next") &&
    (pathname === "/index.html" || pathname.endsWith(".html"));

  if (canRewriteHtml) {
    const url = req.nextUrl.clone();
    if (pathname === "/index.html") {
      // Serve the homepage directly — no redirect. Browsers that cached the
      // old "/" → "/index.html" 301 would otherwise visibly bounce twice.
      // HomeUrlCleanup fixes the visible URL client-side.
      url.pathname = "/";
      return NextResponse.rewrite(url);
    }
    url.pathname = pathname.slice(0, -5);
    return NextResponse.rewrite(url);
  }

  // Always forward the resolved pathname so AdminLayout (RSC) can detect the
  // login route and skip its own cookie-bounce — otherwise /admin/login loops.
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-pathname", pathname);
  const passthrough = () =>
    NextResponse.next({ request: { headers: requestHeaders } });

  if (!pathname.startsWith("/admin") || pathname === "/admin/login") {
    return passthrough();
  }
  const hasSession = SESSION_COOKIE_NAMES.some(
    (name) => req.cookies.get(name)?.value,
  );
  if (hasSession) {
    return passthrough();
  }
  // Diagnostic: list every cookie name the request DID send so we can spot
  // whether the session cookie was renamed, dropped, or simply never issued.
  // Logs to the Next dev server console — does not leak to the browser.
  const cookieNames = req.cookies.getAll().map((c) => c.name);
  console.warn(
    `[middleware] bouncing → /admin/login (path=${pathname}) — cookies present: [${cookieNames.join(", ") || "(none)"}]`,
  );
  const url = req.nextUrl.clone();
  url.pathname = "/admin/login";
  url.searchParams.set("from", pathname);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
