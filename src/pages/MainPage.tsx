import { useEffect, useMemo, useState } from "react";
import apiInstance from "../api/axiosInstance";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import useUserStore from "../store/userStore";
import { Match } from "../types/match";
import MainHeader from "../components/ui/MainHeader";
import MatchCard from "../components/ui/MatchCard";
import EmptyState from "../components/ui/EmptyState";

const MainPage = () => {
  const { user } = useUserStore();
  const [lastMatch, setLastMatch] = useState<Match | null>(null);
  const [timeTick, setTimeTick] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchLastMatch = async () => {
    try {
      setIsLoading(true);
      setErrorMessage(null);
      const res = await apiInstance.get("/matches/main");
      const matchData = res.data.lastMatch;
      setLastMatch(matchData);
    } catch (e) {
      console.error(e);
      setErrorMessage("최근 경기 정보를 불러오지 못했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const matchStatus = useMemo(() => {
    if (!lastMatch) return "종료됨";
    const now = new Date();
    const start = new Date(lastMatch.matchDate);
    const end = new Date(lastMatch.endTime);
    return now >= start && now <= end ? "진행 중" : "종료됨";
  }, [lastMatch, timeTick]);

  useEffect(() => {
    fetchLastMatch();
  }, []);

  useEffect(() => {
    if (!lastMatch) return;
    const timer = setInterval(() => {
      setTimeTick((tick) => tick + 1);
    }, 60000);
    return () => clearInterval(timer);
  }, [lastMatch]);

  const handleUpdateScore = async () => {
    if (!lastMatch) return;

    const home = prompt(
      "마하나임 점수를 입력하세요.",
      String(lastMatch.homeScore ?? 0)
    );
    const away = prompt(
      "상대팀 점수를 입력하세요.",
      String(lastMatch.awayScore ?? 0)
    );

    if (home !== null && away !== null) {
      const homeScore = parseInt(home, 10);
      const awayScore = parseInt(away, 10);
      if (!Number.isFinite(homeScore) || !Number.isFinite(awayScore)) {
        alert("유효한 점수를 입력해주세요.");
        return;
      }
      try {
        await apiInstance.patch(`/matches/${lastMatch.matchId}/score`, {
          homeScore,
          awayScore,
        });
        alert("점수가 업데이트되었습니다.");
        fetchLastMatch();
      } catch (e) {
        alert("점수 업데이트 실패");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <MainHeader />

      <main className="px-5 py-8 space-y-8">
        {/* 최근 경기 결과 섹션 */}
        <section>
          <div className="flex justify-between items-center mb-4 px-1">
            <h2 className="text-xl font-bold text-gray-900">최근 경기 결과</h2>
            {/* 관리자일 때만 편집 버튼 노출 */}
            {user?.role === "ADMIN" && lastMatch && (
              <button
                onClick={handleUpdateScore}
                className="flex items-center gap-1 text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded-lg"
              >
                <PencilSquareIcon className="w-3 h-3" />
                점수 입력
              </button>
            )}
          </div>

          {lastMatch ? (
            <MatchCard match={lastMatch} matchStatus={matchStatus} />
          ) : (
            <EmptyState
              message={
                isLoading
                  ? "최근 경기 정보를 불러오는 중..."
                  : errorMessage || "기록된 최근 경기가 없습니다."
              }
            />
          )}
        </section>
      </main>
    </div>
  );
};

export default MainPage;
