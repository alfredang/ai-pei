import Link from "next/link";
import { auth, signOut } from "@/lib/auth";
import { redirect } from "next/navigation";

const navItems = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/pages", label: "Pages" },
  { href: "/admin/posts", label: "Posts" },
  { href: "/admin/categories", label: "Categories" },
  { href: "/admin/tags", label: "Tags" },
  { href: "/admin/menus", label: "Menus" },
  { href: "/admin/media", label: "Media" },
  { href: "/admin/leads", label: "Leads" },
  { href: "/admin/settings", label: "Settings" },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // /admin/login is excluded from this guard via the page itself
  if (!session?.user) {
    // For non-login pages, middleware already redirects. For safety:
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex">
      <aside className="w-60 glass min-h-screen p-4 flex flex-col">
        <div className="mb-6">
          <h2 className="text-lg font-bold">TI CMS</h2>
          <p className="text-xs text-white/50">{session.user.email}</p>
        </div>
        <nav className="flex-1 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-3 py-2 rounded hover:bg-white/5 text-sm"
            >
              {item.label}
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
            className="w-full text-left px-3 py-2 rounded hover:bg-white/5 text-sm text-white/70"
          >
            Sign out
          </button>
        </form>
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
