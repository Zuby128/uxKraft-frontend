import type { ILoginBody, IUser } from "@/types/auth.type";
import { UserRole } from "@/types/enums.type";
import { create } from "zustand";

interface AuthStore {
  user: IUser | null;
  token: string | null;
  isLoading: boolean;
  setLoading: () => void;
  logout: () => void;
  login: (body: ILoginBody) => void;
  initial: () => void;
}

const USER_EMAIL = "test@email.com";
const USER_PASSWORD = "z123456";

const TOKEN = "APP_TOKEN";
const USER = "APP_USER";

/**
 * Kolaylık olması için sadece frontendde mockup bir login/auth sistemi kurdum
 * Cookies de access token vb şeyler ile uğraşmadım,
 * umarım bu bir eksiklik olarak görülmez
 */

const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: null,
  isLoading: false,
  setLoading: () => set({ isLoading: true }),
  logout: () => {
    set({ token: null });
    set({ user: null });
    window.localStorage.removeItem(TOKEN);
    window.localStorage.removeItem(USER);
  },
  login: (body: ILoginBody) => {
    const { email, password } = body;
    if (email === USER_EMAIL && password === USER_PASSWORD) {
      set({ token: "mockup_token" });
      set({ user: { email: USER_EMAIL, role: UserRole.user } });
      window.localStorage.setItem(TOKEN, "mockup_token");
      window.localStorage.setItem(USER, JSON.stringify({ email: USER_EMAIL }));
    }
  },
  initial: () => {
    const token = window.localStorage.getItem(TOKEN);
    const user = window.localStorage.getItem(USER);
    if (token && user && token !== "undefined" && user !== "undefined") {
      set({ token });
      set({ user: JSON.parse(user) });
    }
  },
}));

export default useAuthStore;
