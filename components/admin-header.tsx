import Link from "next/link";

export function AdminHeader() {
  return (
    <header className="admin-header">
      <div>
        <p className="eyebrow">Private Dashboard</p>
        <h1>Portfolio Admin</h1>
      </div>
      <div className="admin-actions">
        <Link href="/" className="button button-secondary">
          View site
        </Link>
        <form action="/admin/logout" method="post">
          <button type="submit" className="button button-secondary">
            Logout
          </button>
        </form>
      </div>
    </header>
  );
}
