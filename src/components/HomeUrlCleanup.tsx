"use client";

import { useEffect } from "react";

/**
 * The homepage is also served at /index.html (middleware rewrite) so browsers
 * holding the old cached "/" → "/index.html" 301 don't visibly bounce.
 * This swaps the address bar back to "/" without any navigation.
 */
export function HomeUrlCleanup() {
  useEffect(() => {
    if (window.location.pathname === "/index.html") {
      window.history.replaceState(
        null,
        "",
        `/${window.location.search}${window.location.hash}`,
      );
    }
  }, []);
  return null;
}
