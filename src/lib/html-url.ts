const SITE_ORIGIN = "https://www.tertiaryinfotech.edu.sg";

const FILE_EXTENSION_RE = /\/[^/?#]+\.[^/?#]+$/;

function splitSuffix(path: string) {
  const hashIndex = path.indexOf("#");
  const queryIndex = path.indexOf("?");
  const indexes = [hashIndex, queryIndex].filter((i) => i >= 0);
  const firstSuffixIndex = indexes.length > 0 ? Math.min(...indexes) : -1;

  if (firstSuffixIndex === -1) {
    return { pathname: path, suffix: "" };
  }

  return {
    pathname: path.slice(0, firstSuffixIndex),
    suffix: path.slice(firstSuffixIndex),
  };
}

export function htmlPath(path: string): string {
  if (!path || path.startsWith("#")) return path;

  if (/^(mailto:|tel:|sms:|https?:\/\/|\/\/)/i.test(path)) {
    try {
      const url = new URL(path, SITE_ORIGIN);
      if (url.origin !== SITE_ORIGIN) return path;
      const suffix = `${url.search}${url.hash}`;
      return `${url.pathname === "/" ? "/" : htmlPath(url.pathname)}${suffix}`;
    } catch {
      return path;
    }
  }

  const { pathname, suffix } = splitSuffix(path);

  if (
    pathname.startsWith("/admin") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    pathname === "/opengraph-image" ||
    FILE_EXTENSION_RE.test(pathname)
  ) {
    return path;
  }

  const cleanPath = pathname.endsWith("/") && pathname !== "/" ? pathname.slice(0, -1) : pathname;
  const html = cleanPath === "/" ? "/" : `${cleanPath}.html`;
  return `${html}${suffix}`;
}

export function absoluteHtmlUrl(base: string, path: string): string {
  return `${base.replace(/\/$/, "")}${htmlPath(path)}`;
}
