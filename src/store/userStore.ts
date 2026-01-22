import { create } from "zustand";
import { authApi } from "../api/auth";
import { toErrorMessage } from "../utils/httpError";
import type { User } from "../types/user";

interface UserStore {
  user: User | null;
  authLoading: boolean;
  authError: string | null;
  fetchUser: () => Promise<void>;
  logout: () => void;
}

const useUserStore = create<UserStore>((set) => ({
  user: null,
  authLoading: true,
  authError: null,

  fetchUser: async () => {
    set({ authLoading: true, authError: null });
    try {
      const res = await authApi.me();
      set({ user: res.data, authLoading: false, authError: null });
    } catch (error) {
      set({ user: null, authLoading: false, authError: toErrorMessage(error) });
    }
  },

  logout: () => set({ user: null }),
}));

export default useUserStore;
