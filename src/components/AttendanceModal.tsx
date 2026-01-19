import { XMarkIcon } from "@heroicons/react/24/outline";

const AttendanceModal = ({
  isOpen,
  onClose,
  list,
}: {
  isOpen: boolean;
  onClose: () => void;
  list: any[];
}) => {
  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center bg-black/40 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-md rounded-t-[2rem] sm:rounded-3xl p-6 shadow-2xl animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-black text-gray-900">참석자 명단</h3>
          <button onClick={onClose} className="p-2 bg-gray-100 rounded-full">
            <XMarkIcon className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-2">
          {["ATTEND", "ABSENT", "PENDING"].map((status) => {
            const filtered = list.filter((a) => a.status === status);
            return (
              <div key={status} className="space-y-2">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      status === "ATTEND"
                        ? "bg-blue-500"
                        : status === "ABSENT"
                        ? "bg-red-500"
                        : "bg-gray-400"
                    }`}
                  />
                  <h4 className="font-bold text-gray-700">
                    {status === "ATTEND"
                      ? "참석"
                      : status === "ABSENT"
                      ? "불참"
                      : "미정"}{" "}
                    ({filtered.length})
                  </h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {filtered.map((att) => (
                    <span
                      key={att.attendanceId}
                      className="px-4 py-1.5 bg-gray-50 border border-gray-100 rounded-lg text-xs font-semibold text-gray-600"
                    >
                      {att.user?.name || "익명"}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AttendanceModal;
