/**
 * Next.js boots this once per server process.
 *
 * Scheduled/background triggers are intentionally disabled for this project.
 * Blog generation and sync jobs must be started manually from authenticated
 * admin flows or explicit API calls only.
 */
export async function register() {
  return;
}
