"use client";

import AuthForm from "@/components/form/authForm";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const { register, isSigningUp } = useAuthStore();
  const router = useRouter();

  const handleRegister = async ({ username, email, password }) => {
    try {
      await register({ username, email, password });
      router.push("/chat");
    } catch (error) {
      console.log("error in register:", error);
    }
  };

  return (
    <AuthForm type="register" onSubmit={handleRegister} loading={isSigningUp} />
  );
}
