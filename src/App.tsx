import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import MatchCreatePage from "./pages/MatchCreatePage";
import MatchesPage from "./pages/MatchesPage";
import MyPage from "./pages/MyPage";
import SignUpPage from "./pages/SignUpPage";
import useUserStore from "./store/userStore";

function App() {
  const { fetchUser } = useUserStore();
  useEffect(() => {
    fetchUser();
  }, []);

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
