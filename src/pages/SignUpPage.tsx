import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiInstance from "../api/axiosInstance";

const SignUpPage = () => {
  const navigation = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    height: "",
    age: "",
    position: "FW",
    phoneNumber: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await apiInstance.post("users/signup", formData);
      if (res.status === 200) {
        alert("회원가입 성공! 로그인 해주세요.");
        navigation("/login");
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
        <div className="w-full max-w-2xl space-y-8 rounded-2xl bg-white p-10 shadow-xl">
          <div>
            <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
              멤버 등록
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              마하나임 축구단에 오신 것을 환영합니다!
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* 이메일 (전체 너비) */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  이메일
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="example@email.com"
                  onChange={handleChange}
                />
              </div>

              {/* 비밀번호 */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  비밀번호
                </label>
                <input
                  name="password"
                  type="password"
                  required
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="••••••••"
                  onChange={handleChange}
                />
              </div>

              {/* 이름 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  이름
                </label>
                <input
                  name="name"
                  type="text"
                  required
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="홍길동"
                  onChange={handleChange}
                />
              </div>

              {/* 전화번호 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  전화번호
                </label>
                <input
                  name="phoneNumber"
                  type="tel"
                  required
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="010-1234-5678"
                  onChange={handleChange}
                />
              </div>

              {/* 키 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  키 (cm)
                </label>
                <input
                  name="height"
                  type="number"
                  required
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="180"
                  onChange={handleChange}
                />
              </div>

              {/* 나이 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  나이
                </label>
                <input
                  name="age"
                  type="number"
                  required
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="25"
                  onChange={handleChange}
                />
              </div>

              {/* 포지션 */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  주 포지션
                </label>
                <select
                  name="position"
                  value={formData.position}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
                  onChange={handleChange}
                >
                  <option value="FW">공격수 (FW)</option>
                  <option value="MF">미드필더 (MF)</option>
                  <option value="DF">수비수 (DF)</option>
                  <option value="GK">골키퍼 (GK)</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              가입하기
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
