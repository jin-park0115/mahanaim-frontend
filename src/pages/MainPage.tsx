import { useEffect, useState } from "react";
import apiInstance from "../api/axiosInstance";
import {
  ClockIcon,
  MapPinIcon,
  PencilSquareIcon,
  TrophyIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import useUserStore from "../store/userStore";
import { Link } from "react-router-dom";

interface Match {
  matchId: number;
  title: string;
  matchType: string;
  location: string;
  matchDate: string;
  endTime: string;
  matchTime: string;
  description: string;
  homeScore: number;
  awayScore: number;
}

const MainPage = () => {
  const { user } = useUserStore();
  const [lastMatch, setLastMatch] = useState<Match | null>(null);
  const [matchStatus, setMatchStatus] = useState<"진행 중" | "종료됨">(
    "종료됨"
  );

  const formatTime = (dateStr: string) => {
    return new Date(dateStr).toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const fetchLastMatch = async () => {
    try {
      const res = await apiInstance.get("/matches/main");
      const matchData = res.data.lastMatch;
      setLastMatch(matchData);

      if (matchData) {
        checkMatchStatus(matchData.matchDate, matchData.endTime);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const checkMatchStatus = (startStr: string, endStr: string) => {
    const now = new Date();
    const start = new Date(startStr);
    const end = new Date(endStr);

    if (now >= start && now <= end) {
      setMatchStatus("진행 중");
    } else {
      setMatchStatus("종료됨");
    }
  };

  useEffect(() => {
    fetchLastMatch();
    const timer = setInterval(() => {
      if (lastMatch) checkMatchStatus(lastMatch.matchDate, lastMatch.endTime);
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
      try {
        await apiInstance.patch(`/matches/${lastMatch.matchId}/score`, {
          homeScore: parseInt(home),
          awayScore: parseInt(away),
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
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
              {/* 상태 뱃지 추가 */}
              <div className="absolute top-5 left-5 z-20">
                <span
                  className={`flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase ${
                    matchStatus === "진행 중"
                      ? "bg-green-500 animate-pulse"
                      : "bg-gray-700"
                  }`}
                >
                  <ClockIcon className="w-3 h-3" />
                  {matchStatus}
                </span>
              </div>

              <div className="absolute top-0 right-0 p-4 opacity-10">
                <TrophyIcon className="w-32 h-32 text-white" />
              </div>

              <div className="relative z-10 text-center space-y-6">
                <div className="text-xs font-bold text-red-400 uppercase tracking-[0.2em]">
                  {new Date(lastMatch.matchDate).toLocaleDateString("ko-KR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                  <div className="text-sm font-medium text-gray-300">
                    {formatTime(lastMatch.matchDate)} ~{" "}
                    {formatTime(lastMatch.endTime)}
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1 text-center">
                    <div className="text-lg font-black italic mb-1">
                      MAHANAIM
                    </div>
                    <div className="text-xs text-gray-400">HOME</div>
                  </div>

                  <div className="flex-[1.5] flex flex-col items-center justify-center">
                    {lastMatch.homeScore !== null ? (
                      <>
                        <div className="text-5xl font-black flex items-center gap-3">
                          <span
                            className={
                              lastMatch.homeScore > lastMatch.awayScore
                                ? "text-red-500"
                                : ""
                            }
                          >
                            {lastMatch.homeScore}
                          </span>
                          <span className="text-gray-600 text-3xl">:</span>
                          <span>{lastMatch.awayScore}</span>
                        </div>
                        {lastMatch.homeScore > lastMatch.awayScore && (
                          <span className="mt-2 text-[10px] bg-red-600 px-3 py-1 rounded-full font-bold animate-pulse tracking-widest">
                            VICTORY
                          </span>
                        )}
                      </>
                    ) : (
                      <div className="text-4xl font-black text-red-500 italic tracking-tighter">
                        VS
                      </div>
                    )}
                  </div>

                  <div className="flex-1 text-center">
                    <div className="text-lg font-black italic text-gray-300 uppercase truncate">
                      {lastMatch.matchType}
                    </div>
                    <div className="text-xs text-gray-400">AWAY</div>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-700/50">
                  <div className="flex justify-center items-center text-gray-400 text-sm">
                    <MapPinIcon className="w-4 h-4 mr-1.5 text-red-500" />
                    {lastMatch.location}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl text-gray-400 font-medium border border-gray-100 shadow-sm">
              기록된 최근 경기가 없습니다.
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default MainPage;
