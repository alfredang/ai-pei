import type { NextAuthConfig } from "next-auth";

// Edge-safe subset of the auth config used by middleware.
// No DB imports, no bcrypt — those only live in src/lib/auth.ts.
export const authConfig: NextAuthConfig = {
  // 365-day rolling session — effectively "never expires" for an internal admin tool.
  // updateAge=0 means every request refreshes the cookie expiry.
  session: { strategy: "jwt", maxAge: 60 * 60 * 24 * 365, updateAge: 0 },
  pages: { signIn: "/admin/login" },
  providers: [],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as { role?: string }).role ?? "admin";
        token.uid = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = (token.uid as string) ?? "";
        session.user.role = (token.role as string) ?? "admin";
      }
      return session;
    },
  },
};
