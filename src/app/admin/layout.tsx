import Link from "next/link";
import { headers, cookies } from "next/headers";
import { auth, signOut } from "@/lib/auth";
import { redirect } from "next/navigation";
import {
  HiSquares2X2,
  HiDocumentText,
  HiNewspaper,
  HiTag,
  HiHashtag,
  HiBars3,
  HiPhoto,
  HiInbox,
  HiCog6Tooth,
  HiArrowRightOnRectangle,
} from "react-icons/hi2";

const navItems = [
  { href: "/admin", label: "Dashboard", Icon: HiSquares2X2 },
  { href: "/admin/pages", label: "Pages", Icon: HiDocumentText },
  { href: "/admin/posts", label: "Posts", Icon: HiNewspaper },
  { href: "/admin/categories", label: "Categories", Icon: HiTag },
  { href: "/admin/tags", label: "Tags", Icon: HiHashtag },
  { href: "/admin/menus", label: "Menus", Icon: HiBars3 },
  { href: "/admin/media", label: "Media", Icon: HiPhoto },
  { href: "/admin/leads", label: "Leads", Icon: HiInbox },
  { href: "/admin/settings", label: "Settings", Icon: HiCog6Tooth },
];

// Auth strategy for the admin chrome:
//   - Middleware enforces "cookie present" for every /admin/* request.
//   - This layout TRUSTS that check and renders the sidebar whenever the
//     request reaches it on a non-login admin route.
//   - We additionally call auth() to populate the user email in the sidebar,
//     but a transient JWT-decode failure does NOT log the user out.
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const h = await headers();
  const pathname =
    h.get("x-pathname") ?? h.get("next-url") ?? h.get("x-invoke-path") ?? "";
  const isLoginPage = pathname === "/admin/login" || pathname.endsWith("/admin/login");

  // /admin/login renders without the sidebar chrome.
  if (isLoginPage) return <>{children}</>;

  const cookieStore = await cookies();
  const hasSessionCookie =
    Boolean(cookieStore.get("__Secure-authjs.session-token")?.value) ||
    Boolean(cookieStore.get("authjs.session-token")?.value);

  // Defense in depth: if somehow the request reached us without a session
  // cookie AND we're on a protected path (middleware should've caught this),
  // bounce to login. Otherwise we trust the cookie and render chrome.
  if (!hasSessionCookie) {
    redirect(`/admin/login?from=${encodeURIComponent(pathname || "/admin")}`);
  }

  // Best-effort: try to read the email from the session, fall back gracefully.
  let userEmail = "Admin";
  try {
    const session = await auth();
    if (session?.user?.email) userEmail = session.user.email;
  } catch {
    /* JWT decode race — sidebar still renders */
  }

  return (
    <div className="min-h-screen flex">
      <aside className="w-64 shrink-0 bg-(--color-bg-elevated) border-r border-(--color-border) min-h-screen p-5 flex flex-col">
        <Link href="/admin" className="flex items-center gap-2 mb-8">
          <span className="w-8 h-8 rounded-md bg-gradient-to-br from-(--color-purple) to-(--color-cyan) shadow-[var(--shadow-glow-cyan)] grid place-items-center text-xs font-mono font-bold">
            TI
          </span>
          <div>
            <div className="font-display font-bold leading-tight">TI CMS</div>
            <div className="text-[10px] text-white/45 font-mono uppercase">{userEmail}</div>
          </div>
        </Link>
        <nav className="flex-1 space-y-0.5">
          {navItems.map(({ href, label, Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/5 text-sm text-white/85 hover:text-white transition"
            >
              <Icon className="w-4 h-4 text-white/60" />
              {label}
            </Link>
          ))}
        </nav>
        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/admin/login" });
            redirect("/admin/login");
          }}
        >
          <button
            type="submit"
            className="w-full text-left flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/5 text-sm text-white/65 transition"
          >
            <HiArrowRightOnRectangle className="w-4 h-4" />
            Sign out
          </button>
        </form>
      </aside>
      <main className="flex-1 min-w-0 px-8 py-10">{children}</main>
    </div>
  );
}
