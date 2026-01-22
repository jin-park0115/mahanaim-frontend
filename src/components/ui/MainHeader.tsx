import { UserCircleIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const MainHeader = () => {
  return (
    <header className="sticky top-0 z-10 bg-gradient-to-r from-red-600 to-red-700 px-6 py-4 shadow-lg flex justify-between items-center text-white">
      <h1 className="text-xl font-black italic tracking-tighter uppercase">
        Mahanaim FC
      </h1>
      <Link
        to="/mypage"
        className="p-1 hover:bg-red-500 rounded-full transition"
      >
        <UserCircleIcon className="w-7 h-7" />
      </Link>
    </header>
  );
};

export default MainHeader;
