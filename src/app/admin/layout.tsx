import { headers, cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE_NAME } from "@/lib/admin-session";
import { getSiteBrand } from "@/lib/site-settings";
import { getAdminSession, canAccessRoute, type AdminRole } from "@/lib/admin-role";
import { SidebarShell, type NavItem } from "./_components/SidebarShell";

const ALL_NAV: (NavItem & { roles: AdminRole[] })[] = [
  { href: "/admin", label: "Dashboard", icon: "dashboard", roles: ["admin", "editor", "author"] },
  { href: "/admin/pages", label: "Pages", icon: "pages", roles: ["admin", "editor"] },
  { href: "/admin/posts", label: "Posts", icon: "posts", roles: ["admin", "editor", "author"] },
  { href: "/admin/categories", label: "Categories", icon: "categories", roles: ["admin", "editor"] },
  { href: "/admin/tags", label: "Tags", icon: "tags", roles: ["admin", "editor"] },
  { href: "/admin/menus", label: "Menus", icon: "menus", roles: ["admin", "editor"] },
  { href: "/admin/media", label: "Media", icon: "media", roles: ["admin", "editor", "author"] },
  { href: "/admin/leads", label: "Leads", icon: "leads", roles: ["admin", "editor"] },
  { href: "/admin/users", label: "Users", icon: "users", roles: ["admin"] },
  { href: "/admin/settings", label: "Settings", icon: "settings", roles: ["admin", "editor"] },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const h = await headers();
  const pathname =
    h.get("x-pathname") ?? h.get("next-url") ?? h.get("x-invoke-path") ?? "";
  const isLoginPage = pathname === "/admin/login" || pathname.endsWith("/admin/login");

  if (isLoginPage)
    return (
      <div data-theme="dark" className="min-h-screen bg-(--color-bg) text-(--color-text)">
        {children}
      </div>
    );

  const cookieStore = await cookies();
  const hasSessionCookie =
    Boolean(cookieStore.get(ADMIN_COOKIE_NAME)?.value) ||
    Boolean(cookieStore.get("__Secure-authjs.session-token")?.value) ||
    Boolean(cookieStore.get("authjs.session-token")?.value);

  if (!hasSessionCookie) {
    redirect(`/admin/login?from=${encodeURIComponent(pathname || "/admin")}`);
  }

  const [brand, session] = await Promise.all([getSiteBrand(), getAdminSession()]);
  // If JWT decode failed but a cookie is present, default to admin (legacy
  // behaviour) so we don't lock the user out due to a transient hiccup.
  const role: AdminRole = session?.role ?? "admin";
  const email = session?.email ?? "";

  // Per-role route enforcement (defense in depth — middleware should already
  // handle this for non-admin routes, but the layout is the cleanest place
  // to redirect on a page-level basis).
  if (pathname && !canAccessRoute(role, pathname)) {
    redirect("/admin");
  }

  const items: NavItem[] = ALL_NAV.filter((n) => n.roles.includes(role)).map(
    ({ href, label, icon }) => ({ href, label, icon }),
  );

  async function signOutAction() {
    "use server";
    const jar = await cookies();
    jar.delete(ADMIN_COOKIE_NAME);
    jar.delete("authjs.session-token");
    jar.delete("__Secure-authjs.session-token");
    redirect("/admin/login");
  }

  return (
    <div data-theme="dark" className="min-h-screen flex bg-(--color-bg) text-(--color-text)">
      <SidebarShell
        brand={{ shortName: brand.shortName, logoUrl: brand.logoUrl }}
        email={email}
        role={role}
        items={items}
        signOutAction={signOutAction}
      />
      <main className="flex-1 min-w-0 px-8 py-10">{children}</main>
    </div>
  );
}
