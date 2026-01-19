import { ClockIcon } from "@heroicons/react/24/outline";
import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiInstance from "../api/axiosInstance";

const MatchCreatePage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    matchDate: "",
    endTime: "",
    matchType: "자체전",
    awayName: "",
    location: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const startVal = e.target.value;
    let newEndTime = formData.endTime;

    if (startVal && !formData.endTime) {
      const startDate = new Date(startVal);
      startDate.setHours(startDate.getHours() + 2);

      const year = startDate.getFullYear();
      const month = String(startDate.getMonth() + 1).padStart(2, "0");
      const day = String(startDate.getDate()).padStart(2, "0");
      const hours = String(startDate.getHours()).padStart(2, "0");
      const minutes = String(startDate.getMinutes()).padStart(2, "0");

      newEndTime = `${year}-${month}-${day}T${hours}:${minutes}`;
    }

    setFormData({ ...formData, matchDate: startVal, endTime: newEndTime });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const submitData = {
        ...formData,
        matchType:
          formData.matchType === "상대팀" ? `${formData.awayName}` : "자체전",
      };

      await apiInstance.post("/matches", submitData);
      alert("경기가 성공적으로 등록되었습니다!");
      navigate("/");
    } catch (err: any) {
      alert(err.response?.data || "등록에 실패했습니다.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        새 경기 등록
      </h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-sm p-6 space-y-4"
      >
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            경기 일시
          </label>
          <input
            type="datetime-local"
            name="matchDate"
            required
            value={formData.matchDate}
            className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-red-500"
            onChange={handleStartDateChange}
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center text-sm font-bold text-gray-700">
            <ClockIcon className="w-4 h-4 mr-1 text-red-500" />
            경기 종료 일시
          </label>
          <input
            type="datetime-local"
            required
            className="w-full p-4 bg-white border border-gray-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition"
            value={formData.endTime}
            onChange={(e) =>
              setFormData({ ...formData, endTime: e.target.value })
            }
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            경기 유형
          </label>
          <select
            name="matchType"
            className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-red-500"
            value={formData.matchType}
            onChange={handleChange}
          >
            <option value="상대팀">상대팀(외부)</option>
            <option value="자체전">자체 경기</option>
          </select>
          {formData.matchType === "상대팀" && (
            <input
              type="text"
              name="awayName"
              placeholder="상대팀명 입력"
              className="flex-1 border rounded-lg px-3 py-2 outline-none foucs:ring-2 focus:ring-red-500 border-red-200"
              onChange={handleChange}
              required
            />
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            장소
          </label>
          <input
            type="text"
            name="location"
            placeholder="예: 발산중학교"
            required
            className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-red-500"
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            상세 설명
          </label>
          <textarea
            name="description"
            rows={3}
            placeholder="경기 관련 공지사항을 입력하세요."
            className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-red-500"
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-red-600 text-white font-bold py-3 rounded-xl shadow-lg active:scale-95 transition"
        >
          경기 생성하기
        </button>
      </form>
    </div>
  );
};

export default MatchCreatePage;
