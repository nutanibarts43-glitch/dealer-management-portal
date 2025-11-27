import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="w-full bg-white shadow-md px-6 py-3 flex items-center justify-between border-b border-[#B9986D]/30">
      <Link to="/" className="text-2xl font-bold" style={{ color: "#B9986D" }}>
        Dealer Portal
      </Link>

      {/* <div className="hidden md:flex gap-6">
        <NavLink
          to="/"
          className="text-gray-700 hover:text-[#B9986D] transition"
        >
          Home
        </NavLink>

        <NavLink
          to="/about"
          className="text-gray-700 hover:text-[#B9986D] transition"
        >
          About
        </NavLink>

        <NavLink
          to="/contact"
          className="text-gray-700 hover:text-[#B9986D] transition"
        >
          Contact
        </NavLink>
      </div> */}

      <div className="flex gap-3">     
        <Link
          to="/login"
          className="px-4 py-2 border rounded-md transition"
          style={{
            borderColor: "#B9986D",
            color: "#B9986D",
          }}
        >
          Login
        </Link>

        <Link
          to="/register"
          className="px-4 py-2 rounded-md text-white transition"
          style={{
            backgroundColor: "#B9986D",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#a6855f")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#B9986D")}
        >
          Sign Up
        </Link>
      </div>
    </nav>
  );
}
