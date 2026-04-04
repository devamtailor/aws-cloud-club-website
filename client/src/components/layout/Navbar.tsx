import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";

const navItems = [
  { label: "Dashboard", href: "/", icon: "📊" },
  { label: "Why Us", href: "/why-us", icon: "⭐" },
  { label: "Team", href: "/team", icon: "👥" },
  { label: "Events", href: "/events", icon: "📅" },
  { label: "Join Us", href: "/join", icon: "🚀" },
];

export const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-linear-to-b from-[#0b1220] via-[#0f172a] to-transparent backdrop-blur-2xl">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-linear-to-br from-orange-500 to-orange-600 shadow-lg shadow-orange-500/30 transition-all group-hover:shadow-orange-500/50">
            <span className="text-lg">☁️</span>
          </div>
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-widest text-orange-400">AWS</p>
            <p className="text-sm font-semibold text-white -mt-1">Cloud Club</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 group ${
                  isActive
                    ? "bg-orange-500/20 text-orange-300 border border-orange-500/30"
                    : "text-slate-400 hover:text-white hover:bg-white/8 border border-transparent"
                }`
              }
            >
              <span className="text-base opacity-70 group-hover:opacity-100">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </div>

        {/* Right side buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={() => navigate("/admin/login")}
            className="rounded-lg bg-linear-to-r from-orange-500 to-orange-600 px-4 py-2 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-orange-500/40"
          >
            Admin Portal
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 rounded-lg text-slate-400 hover:bg-white/8 transition-all"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="border-t border-white/5 bg-linear-to-b from-white/8 to-transparent px-4 py-4 space-y-2 backdrop-blur-md"
        >
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `px-4 py-3 rounded-lg text-sm font-medium transition-all flex items-center gap-3 ${
                  isActive
                    ? "bg-orange-500/20 text-orange-300 border border-orange-500/30"
                    : "text-slate-400 hover:text-white hover:bg-white/8 border border-transparent"
                }`
              }
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
          <button
            onClick={() => {
              navigate("/admin/login");
              setIsOpen(false);
            }}
            className="mt-4 w-full rounded-lg bg-linear-to-r from-orange-500 to-orange-600 px-4 py-3 text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-orange-500/40"
          >
            Admin Portal
          </button>
        </motion.div>
      )}
    </header>
  );
};
