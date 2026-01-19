import { create } from "zustand";
import axios from "axios";

interface UserStore {
  user: string | any;
  isLoading: boolean;
  fetchUser: () => Promise<void>;
  logout: () => void;
}

const useUserStore = create<UserStore>((set) => ({
  user: null,
  isLoading: true,

  fetchUser: async () => {
    set({ isLoading: true });
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    try {
      const res = await axios.get(`${baseUrl}/api/users/me`, {
        withCredentials: true,
      });
      set({ user: res.data, isLoading: false });
    } catch (error) {
      set({ user: null, isLoading: false });
    }
  },

  logout: () => set({ user: null }),
}));

export default useUserStore;
