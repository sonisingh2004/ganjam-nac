import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  Truck,
  LayoutDashboard,
  FileWarning,
  UserCheck,
  BarChart3,
  Navigation,
  LogOut,
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const SupervisorLayout = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const LOGO = "https://swachhganjam.in/assets/logo-D7UUn_EU.png";

  const links = [
    { name: "Dashboard", path: "/supervisor/dashboard", icon: <LayoutDashboard size={18} /> },
    { name: "Vehicles", path: "/supervisor/vehicles", icon: <Truck size={18} /> },
    { name: "Complaints", path: "/supervisor/complaints", icon: <FileWarning size={18} /> },
    { name: "Attendance", path: "/supervisor/attendance", icon: <UserCheck size={18} /> },
    { name: "Analytics", path: "/supervisor/analytics", icon: <BarChart3 size={18} /> },
    { name: "Live Tracking", path: "/supervisor/live-tracking", icon: <Navigation size={18} /> },
  ];

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="h-screen flex bg-gray-100 overflow-hidden">

      {/* ================= MOBILE TOP BAR ================= */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-white shadow px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src={LOGO} className="h-8 w-8 rounded-full" />
          <span className="font-semibold text-green-700">
            Supervisor
          </span>
        </div>
        <button onClick={() => setOpen(true)}>
          <Menu />
        </button>
      </div>

      {/* ================= MOBILE DRAWER ================= */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/40">
          <aside className="w-64 bg-white h-full shadow-lg p-4 flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-bold text-green-700">
                Supervisor Panel
              </h2>
              <button onClick={() => setOpen(false)}>
                <X />
              </button>
            </div>

            <nav className="flex-1 space-y-2 overflow-y-auto">
              {links.map((l) => (
                <NavLink
                  key={l.name}
                  to={l.path}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-md text-sm ${
                      isActive
                        ? "bg-green-100 text-green-700 font-medium"
                        : "text-gray-600 hover:bg-gray-100"
                    }`
                  }
                >
                  {l.icon}
                  {l.name}
                </NavLink>
              ))}
            </nav>

            {/* LOGOUT MOBILE */}
            <button
              onClick={handleLogout}
              className="mt-4 flex items-center gap-3 text-red-600 px-3 py-2 rounded-md hover:bg-red-50"
            >
              <LogOut size={18} />
              Logout
            </button>
          </aside>
        </div>
      )}

      {/* ================= DESKTOP SIDEBAR ================= */}
      <aside className="hidden md:flex w-64 bg-white shadow flex-col fixed left-0 top-0 h-screen">
        <div className="px-6 py-5 border-b flex items-center gap-3">
          <img
            src={LOGO}
            alt="Logo"
            className="h-10 w-10 rounded-full bg-white p-1 shadow"
          />
          <div>
            <h2 className="text-base font-bold text-green-700">
              Supervisor Panel
            </h2>
            <p className="text-xs text-gray-500">
              Waste Management
            </p>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {links.map((l) => (
            <NavLink
              key={l.name}
              to={l.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-md text-sm ${
                  isActive
                    ? "bg-green-100 text-green-700 font-medium"
                    : "text-gray-600 hover:bg-gray-100"
                }`
              }
            >
              {l.icon}
              {l.name}
            </NavLink>
          ))}
        </nav>

        {/* LOGOUT BOTTOM */}
        <div className="p-4 border-t">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 text-red-600 px-4 py-2 rounded-md hover:bg-red-50"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* ================= TOP HEADER (LOGOUT TOP RIGHT) ================= */}
      <header className="hidden md:flex fixed top-0 left-64 right-0 h-16 bg-white border-b z-40 items-center justify-end px-6">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
        >
          <LogOut size={18} />
          Logout
        </button>
      </header>

      {/* ================= MAIN CONTENT ================= */}
      <main className="flex-1 ml-0 md:ml-64 pt-16 overflow-y-auto">
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default SupervisorLayout;
