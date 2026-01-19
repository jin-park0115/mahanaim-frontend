import useUserStore from "../store/userStore";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import apiInstance from "../api/axiosInstance";

const MyPage = () => {
  const { user, logout, fetchUser } = useUserStore();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    position: user?.position || "",
    age: user?.age || 0,
    height: user?.height || 0,
    phoneNumber: user?.phoneNumber || "",
  });

  const handleSave = async () => {
    try {
      await apiInstance.patch("/users/me", editForm);
      alert("수정 되었습니다.");

      await fetchUser();

      setIsEditing(false);
    } catch (e) {
      console.error(e);
    }
  };

  const formatPhoneNumber = (phone: string | undefined) => {
    if (!phone) return "정보 없음";

    const digits = phone.replace(/\D/g, "");
    if (digits.length === 11) {
      return digits.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
    }

    return phone;
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-gray-600 mb-4">로그인이 필요한 페이지입니다.</p>
        <button
          onClick={() => navigate("/login")}
          className="bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          로그인하러 가기
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* 상단 프로필 헤더 */}
        <div className="bg-red-600 p-6 text-center">
          <div className="w-24 h-24 bg-white rounded-full mx-auto flex items-center justify-center text-3xl font-bold text-red-600 mb-4">
            {user.name.charAt(0)}
          </div>
          <h2 className="text-2xl font-bold text-white">{user.name}</h2>
          <span className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-600">
            {user.role === "ADMIN" ? "관리자" : "일반 회원"}
          </span>
        </div>

        {/* 상세 정보 리스트 */}
        <div className="p-6 space-y-4">
          <div className="flex justify-between border-b pb-2 items-center">
            <span className="text-gray-500">포지션</span>
            {isEditing ? (
              <select
                className="border rounded px-2 py-1 text-sm outline-none border-red-300"
                value={editForm.position}
                onChange={(e) =>
                  setEditForm({ ...editForm, position: e.target.value })
                }
              >
                <option value="FW">FW</option>
                <option value="MF">MF</option>
                <option value="DF">DF</option>
                <option value="GK">GK</option>
              </select>
            ) : (
              <span className="text-blue-600 font-bold">{user.position}</span>
            )}
          </div>

          {[
            { label: "나이", key: "age", unit: "세", type: "number" },
            { label: "키", key: "height", unit: "cm", type: "number" },
            { label: "연락처", key: "phoneNumber", unit: "", type: "text" },
          ].map((item) => (
            <div
              key={item.key}
              className="flex justify-between border-b pb-2 items-center"
            >
              <span className="text-gray-500">{item.label}</span>
              {isEditing ? (
                <input
                  type={item.type}
                  className="border rounded px-2 py-1 text-sm text-right outline-none border-red-300"
                  value={editForm[item.key as keyof typeof editForm]}
                  onChange={(e) =>
                    setEditForm({ ...editForm, [item.key]: e.target.value })
                  }
                />
              ) : (
                <span className="font-medium text-gray-800">
                  {item.key === "phoneNumber"
                    ? formatPhoneNumber(user.phoneNumber)
                    : `${user[item.key as keyof typeof user]}${item.unit}`}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* 하단 버튼 섹션 */}
        <div className="p-6 pt-0 flex gap-3">
          {isEditing ? (
            <>
              <button
                onClick={() => setIsEditing(false)}
                className="flex-1 bg-gray-100 py-2 rounded-lg text-sm font-medium"
              >
                취소
              </button>
              <button
                onClick={handleSave}
                className="flex-1 bg-red-600 text-white py-2 rounded-lg text-sm font-bold shadow-md shadow-red-200"
              >
                저장 완료
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="flex-1 border border-red-600 text-red-600 py-2 rounded-lg text-sm font-medium hover:bg-red-50 transition"
              >
                내 정보 수정
              </button>
              <button
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
                className="flex-1 bg-gray-100 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-200"
              >
                로그아웃
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyPage;
