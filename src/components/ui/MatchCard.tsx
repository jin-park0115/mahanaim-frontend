import { ClockIcon, MapPinIcon, TrophyIcon } from "@heroicons/react/24/outline";
import { Match } from "../../types/match";

type MatchStatus = "진행 중" | "종료됨";

interface MatchCardProps {
  match: Match;
  matchStatus: MatchStatus;
}

const MatchCard = ({ match, matchStatus }: MatchCardProps) => {
  const formatTime = (dateStr: string) => {
    return new Date(dateStr).toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
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
          {new Date(match.matchDate).toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
          <div className="text-sm font-medium text-gray-300">
            {formatTime(match.matchDate)} ~ {formatTime(match.endTime)}
          </div>
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 text-center">
            <div className="text-lg font-black italic mb-1">MAHANAIM</div>
            <div className="text-xs text-gray-400">HOME</div>
          </div>

          <div className="flex-[1.5] flex flex-col items-center justify-center">
            {match.homeScore !== null ? (
              <>
                <div className="text-5xl font-black flex items-center gap-3">
                  <span
                    className={
                      match.homeScore > match.awayScore ? "text-red-500" : ""
                    }
                  >
                    {match.homeScore}
                  </span>
                  <span className="text-gray-600 text-3xl">:</span>
                  <span>{match.awayScore}</span>
                </div>
                {match.homeScore > match.awayScore && (
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
              {match.matchType}
            </div>
            <div className="text-xs text-gray-400">AWAY</div>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-700/50">
          <div className="flex justify-center items-center text-gray-400 text-sm">
            <MapPinIcon className="w-4 h-4 mr-1.5 text-red-500" />
            {match.location}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchCard;
