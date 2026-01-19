import {
  CalendarIcon,
  ChevronLeftIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiInstance from "../api/axiosInstance";
import AttendanceModal from "../components/AttendanceModal";
import VoteButtons from "../components/VoteButton";
import useUserStore from "../store/userStore";

interface Match {
  matchId: number;
  title: string;
  matchType: string;
  location: string;
  matchDate: string;
  endTime: string;
  matchTime: string;
  description: string;
  myStatus?: string;
}

const MatchesPage = () => {
  const { user } = useUserStore();

  const [upcomingMatches, setUpcomingMatches] = useState<Match[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [attendanceList, setAttendanceList] = useState<any[]>([]);

  const navigate = useNavigate();

  const fetchMatches = async () => {
    try {
      const res = await apiInstance.get("/matches");
      const now = new Date();

      const upcoming = res.data
        .filter((m: Match) => new Date(m.matchDate) >= now)
        .map((m: any) => {
          const myVote = m.attendances?.find(
            (a: any) => a.user?.userId === user?.userId
          );

          return {
            ...m,
            myStatus: myVote ? myVote.status : null,
          };
        })
        .sort(
          (a: Match, b: Match) =>
            new Date(a.matchDate).getTime() - new Date(b.matchDate).getTime()
        );
      setUpcomingMatches(upcoming);
      console.log(res);
    } catch (e) {
      console.error("일정 로드 실패", e);
    }
  };

  useEffect(() => {
    if (user) {
      fetchMatches();
    }
  }, [user]);

  useEffect(() => {
    fetchMatches();
  }, []);

  const openAttendanceModal = async (matchId: number) => {
    setIsModalOpen(true);
    try {
      const res = await apiInstance.get(`/attendance/${matchId}`);
      setAttendanceList(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleVote = async (matchId: number, status: string) => {
    try {
      const res = await apiInstance.post("/attendance/vote", {
        matchId,
        status,
      });
      console.log(res, "투표콘솔");
      alert(`${res.data}, 투표 완료`);
      fetchMatches();
    } catch (e) {
      console.error(e, "투표 실패");
    }
  };

  const formatDate = (startDateStr: string, endDateStr: string | null) => {
    const start = new Date(startDateStr);

    // 날짜 부분
    const datePart = new Intl.DateTimeFormat("ko-KR", {
      month: "long",
      day: "numeric",
      weekday: "short",
    }).format(start);

    const formatTime = (date: Date) =>
      new Intl.DateTimeFormat("ko-KR", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).format(date);

    // 시작 시간은 항상 있다고 가정
    const startTime = formatTime(start);

    // 종료 시간이 없거나(null) 기본값(00:00)인 경우 처리
    if (!endDateStr || endDateStr.includes("0000-00-00")) {
      return { datePart, timeRange: `${startTime} ~ 미정` };
    }

    const end = new Date(endDateStr);
    return {
      datePart,
      timeRange: `${startTime} ~ ${formatTime(end)}`,
    };
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* 상단 헤더 */}
      <header className="bg-white px-4 py-4 shadow-sm flex items-center sticky top-0 z-10">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <ChevronLeftIcon className="w-6 h-6 text-gray-600" />
        </button>
        <h1 className="text-xl font-bold ml-2 text-gray-900">경기 일정</h1>
      </header>

      <main className="p-5">
        <div className="space-y-6">
          {upcomingMatches.length > 0 ? (
            upcomingMatches.map((match) => {
              const { datePart, timeRange } = formatDate(
                match.matchDate,
                match.endTime
              );
              return (
                <div
                  key={match.matchId}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
                  onClick={() => openAttendanceModal(match.matchId)}
                >
                  <div className="bg-red-50 px-4 py-2 flex justify-between items-center">
                    <span className="text-red-600 text-sm font-bold flex items-center">
                      <CalendarIcon className="w-4 h-4 mr-1" />
                      {datePart}
                    </span>
                    <span className="text-red-600 text-sm font-bold">
                      {timeRange}
                    </span>
                  </div>

                  <div className="p-5 space-y-3">
                    <div>
                      <h3 className="text-lg font-black text-gray-900 mb-1">
                        {match.matchType}
                      </h3>
                      <div className="flex items-center text-gray-500 text-sm">
                        <MapPinIcon className="w-4 h-4 mr-1 text-gray-400" />
                        {match.location}
                      </div>
                    </div>

                    {match.description && (
                      <p className="text-sm text-gray-400 bg-gray-50 p-3 rounded-xl border border-gray-50">
                        {match.description}
                      </p>
                    )}

                    <VoteButtons
                      myStatus={match.myStatus}
                      onVote={(status) => handleVote(match.matchId, status)}
                    />
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-400">예정된 경기가 없습니다.</p>
            </div>
          )}
        </div>
      </main>

      <AttendanceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        list={attendanceList}
      />
    </div>
  );
};

export default MatchesPage;
