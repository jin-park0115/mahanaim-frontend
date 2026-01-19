import {
  CalendarIcon,
  ChartBarIcon,
  HomeIcon,
  PlusCircleIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { useLocation, useNavigate } from "react-router-dom";
import useUserStore from "../store/userStore";

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useUserStore();

  const hideNavBarPaths = ["/login", "/signup"];

  if (hideNavBarPaths.includes(location.pathname)) {
    return null;
  }

  const isAdmin = user?.role === "ADMIN";

  const navItems = [
    { label: "홈", icon: <HomeIcon className="w-6 h-6" />, path: "/" },
    {
      label: "일정",
      icon: <CalendarIcon className="w-6 h-6" />,
      path: "/matches",
    },
    // 관리자일 때만 '경기 등록' 항목을 배열에 추가
    ...(isAdmin
      ? [
          {
            label: "등록",
            icon: <PlusCircleIcon className="w-6 h-6 text-red-600" />,
            path: "/admin/match-create",
          },
        ]
      : []),
    {
      label: "기록",
      icon: <ChartBarIcon className="w-6 h-6" />,
      path: "/records",
    },
    {
      label: "MY",
      icon: <UserCircleIcon className="w-6 h-6" />,
      path: "/mypage",
    },
  ];
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-3 flex justify-around items-center shadow-[0_-4px_10px_rgba(0,0,0,0.05)] z-50">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <div
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`flex flex-col items-center space-y-1 cursor-pointer transition-all ${
              isActive ? "text-red-600 scale-110" : "text-gray-400"
            }`}
          >
            {item.icon}
            <span className="text-[10px] font-bold">{item.label}</span>
          </div>
        );
      })}
    </nav>
  );
};

export default NavBar;
