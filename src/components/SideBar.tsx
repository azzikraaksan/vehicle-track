import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo-widya.jpg";
import logo2 from "../assets/logo-widya-2.png";
import { LuLayoutDashboard } from "react-icons/lu";
import { FaListUl } from "react-icons/fa6";

interface SidebarProps {
  isOpen: boolean;
}

export default function SideBar({ isOpen }: SidebarProps) {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/", icon: <LuLayoutDashboard size={18} /> },
    { name: "Vehicle List", path: "/vehicles", icon: <FaListUl size={18} /> },
  ];

  return (
    <div
      className={`bg-white text-[#1E293B] h-screen p-4 transition-all duration-300 ${
        isOpen ? "w-60" : "w-16"
      } shrink-0`}
    >
      <div className="text-xl font-bold mb-6">
        <div className="flex justify-center">
          {isOpen ? (
            <img src={logo} alt="Logo" className="h-20" />
          ) : (
            <img src={logo2} alt="Logo" className="h-8" />
          )}
        </div>
      </div>

      <ul className="space-y-2 text-sm">
        {menuItems.map((item) => {
          const isActive =
            item.path === "/vehicles"
              ? location.pathname.startsWith("/vehicles")
              : location.pathname === item.path;

          return (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center gap-3 rounded-[10px] px-2 py-2 hover:bg-blue-200 transition-colors ${
                  isActive ? "bg-[#3B82F6] text-white" : ""
                }`}
              >
                <span>{item.icon}</span>
                {isOpen && <span>{item.name}</span>}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
