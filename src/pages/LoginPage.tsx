import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "../api/auth";
import useUserStore from "../store/userStore";
import { toErrorMessage } from "../utils/httpError";
import FormAlert from "../components/FormAlert";

const LoginPage = () => {
  const { fetchUser } = useUserStore();

  const navigation = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      setErrorMessage(null);
      const res = await authApi.login({
        email,
        password,
      });
      if (res.status == 200) {
        console.log(res);
        alert(`${res.data}`);
        fetchUser();
        navigation("/");
      }
    } catch (e) {
      console.error(e);
      setErrorMessage(toErrorMessage(e));
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 rounded-2xl bg-white p-10 shadow-xl">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tighter text-gray-900">
            Mahanaim
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            서비스 이용을 위해 로그인해주세요.
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {errorMessage && <FormAlert message={errorMessage} />}
          <div className="-space-y-px rounded-md shadow-sm">
            <div className="mb-4">
              <label
                htmlFor="email"
                className="blcok text-sm font-medium text-gray-700 mb-1"
              >
                이메일
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                className="relative block w-full rounded-lg border border-gray-300 px-3 py-3 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                placeholder="email을 입력해주세요."
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                비밀번호
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="relative block w-full rounded-lg border border-gray-300 px-3 py-3 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                placeholder="비밀번호를 입력하세요"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative flex w-full justify-center rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {isSubmitting ? "처리 중..." : "로그인"}
            </button>
          </div>
        </form>
        <div className="text-center text-sm">
          <span className="text-gray-500">계정이 없으신가요?</span>{" "}
          <button
            onClick={() => navigation("/signup")}
            className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
          >
            회원가입 하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
