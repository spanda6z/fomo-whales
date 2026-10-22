import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

/**
 * Admin dashboard shell.
 * Protect every admin endpoint on the server (middleware / session).
 * Hiding UI is not sufficient security.
 */
export default function AdminPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
      <p className="mt-2 text-sm text-white/50">
        Protected area. Wire authentication (session / ADMIN_SECRET) before production use.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { href: "/admin/users", label: "Users", desc: "Profiles, suspension, moderation" },
          { href: "/admin/channels", label: "Channels", desc: "Catalog, packages, permissions" },
          { href: "/admin/calls", label: "Calls", desc: "Free calls, price history, milestones" },
          { href: "/admin/payments", label: "Payments", desc: "Orders, refunds, reconciliation" },
          { href: "/admin/publications", label: "Publications", desc: "Queue, retries, Telegram links" },
          { href: "/admin/settings", label: "Settings", desc: "FAQs, free channel, integrations" },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="card-hover block p-6 transition-all"
          >
            <h2 className="text-lg font-semibold text-white">{item.label}</h2>
            <p className="mt-1 text-sm text-white/50">{item.desc}</p>
          </Link>
        ))}
      </div>

      <div className="mt-12 rounded-xl border border-amber-500/30 bg-amber-500/5 p-5 text-sm text-amber-200/90">
        <p className="font-medium">Security note</p>
        <p className="mt-1 text-amber-200/70">
          Implement server-side auth for all /admin routes and API endpoints. Do not rely on
          client-side hiding. Use role-based access control for admin users.
        </p>
      </div>
    </div>
  );
}
