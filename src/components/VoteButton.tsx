const VOTE_OPTIONS = [
  {
    id: "ATTEND",
    label: "참석",
    active: "bg-blue-600 text-white shadow-md",
    normal: "bg-blue-50 text-blue-600",
  },
  {
    id: "ABSENT",
    label: "불참",
    active: "bg-red-600 text-white shadow-md",
    normal: "bg-red-50 text-red-600",
  },
  {
    id: "PENDING",
    label: "미정",
    active: "bg-gray-700 text-white shadow-md",
    normal: "bg-gray-100 text-gray-600",
  },
];

const VoteButtons = ({
  myStatus,
  onVote,
}: {
  myStatus?: string;
  onVote: (status: string) => void;
}) => (
  <div className="grid grid-cols-3 gap-2 mt-2">
    {VOTE_OPTIONS.map((btn) => (
      <button
        key={btn.id}
        onClick={(e) => {
          e.stopPropagation();
          onVote(btn.id);
        }}
        className={`py-3 rounded-xl text-sm font-black transition-all ${
          myStatus === btn.id
            ? btn.active
            : `${btn.normal} border border-transparent`
        }`}
      >
        {btn.label}
      </button>
    ))}
  </div>
);

export default VoteButtons;
