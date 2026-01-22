import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/ui/NavBar";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import MatchCreatePage from "./pages/MatchCreatePage";
import MatchesPage from "./pages/MatchesPage";
import MyPage from "./pages/MyPage";
import SignUpPage from "./pages/SignUpPage";
import useUserStore from "./store/userStore";

function App() {
  const { fetchUser, authLoading } = useUserStore();
  useEffect(() => {
    fetchUser();
  }, []);

  if (authLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-red-600"></div>
          <p className="text-sm font-medium text-gray-500">
            데이터를 불러오는 중...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-20">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/matches" element={<MatchesPage />} />
          <Route path="/admin/match-create" element={<MatchCreatePage />} />
        </Route>
      </Routes>
      <NavBar />
    </div>
  );
}

export default App;
