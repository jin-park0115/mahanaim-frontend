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
    try {
      const res = await axios.get("http://localhost:8080/api/users/me", {
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
