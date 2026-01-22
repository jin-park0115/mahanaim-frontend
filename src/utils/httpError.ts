import axios from "axios";

export const toErrorMessage = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data;
    if (typeof data === "string") return data;
    return (
      data?.message ||
      error.response?.statusText ||
      "요청 중 오류가 발생했습니다."
    );
  }

  if (error instanceof Error) {
    return error.message || "요청 중 오류가 발생했습니다.";
  }

  return "요청 중 오류가 발생했습니다.";
};
