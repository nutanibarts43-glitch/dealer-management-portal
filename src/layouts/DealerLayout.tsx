import { Outlet, NavLink } from "react-router-dom";

export default function DealerLayout() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md p-4">
        <nav className="flex flex-col gap-3">
          <NavLink to="/dashboard" className="text-gray-700">
            Dashboard
          </NavLink>
          <NavLink to="/profile" className="text-gray-700">
            Profile
          </NavLink>
          <NavLink to="/services" className="text-gray-700">
            Services
          </NavLink>
          <NavLink to="/gallery" className="text-gray-700">
            Gallery
          </NavLink>
          <NavLink to="/social" className="text-gray-700">
            Social Links
          </NavLink>
        </nav>
      </aside>

      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}
