"use client";

import AuthForm from "@/components/form/authForm";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { login, isLoggingIn } = useAuthStore();
  const router = useRouter();

  const handleLogin = async ({ email, password }) => {
    try {
      await login({ email, password });
      router.push("/chat");
    } catch (error) {
      console.log("error in login:", error);
    }
  };

  return <AuthForm type="login" onSubmit={handleLogin} loading={isLoggingIn} />;
}
