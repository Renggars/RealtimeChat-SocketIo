import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL =
  process.env.NODE_ENV === "development" ? "http://localhost:4000" : "/";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isUpdatingUsername: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });

      get().connectSocket();
    } catch (error) {
      console.log("Error in checkAuth:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  register: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/register", data);
      console.log(res.data);
      set({ authUser: res.data.user ?? res.data });
      toast.success("Account created successfully");

      get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      console.log(res.data);
      set({ authUser: res.data.user ?? res.data.data ?? res.data });
      toast.success("Logged in successfully");

      get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
      throw error;
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");

      get().disconnectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  updatePicture: async (data) => {
    set({ isUpdatingPicture: true });
    try {
      const res = await axiosInstance.put("/users/update-picture", data);
      set({ authUser: res.data });
      toast.success("Profile Picture updated successfully");
    } catch (error) {
      console.log("error in update profile picture:", error);
      toast.error(
        error.response?.data?.message || "Failed to update profile picture"
      );
    } finally {
      set({ isUpdatingPicture: false });
    }
  },

  updateUsername: async (data) => {
    set({ isUpdatingUsername: true });
    try {
      const res = await axiosInstance.put("/users/update-username", data);
      set({ authUser: res.data });
      toast.success("Username updated successfully");
    } catch (error) {
      console.log("error in update username:", error);
      toast.error(error.response?.data?.message || "Failed to update username");
    } finally {
      set({ isUpdatingUsername: false });
    }
  },

  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    const socket = io(BASE_URL, {
      query: {
        userId: authUser.id,
      },
    });
    socket.connect();

    set({ socket: socket });

    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },

  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
}));
