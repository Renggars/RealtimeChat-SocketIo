"use client";

import AuthForm from "@/components/form/authForm";

export default function LoginPage() {
  const handleLogin = async ({ email, password }) => {
    // Kirim request ke backend untuk login
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
      {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      }
    );

    if (res.ok) {
      const data = await res.json();
      localStorage.setItem("token", data.token);
      window.location.href = "/chat";
    } else {
      alert("Login gagal");
    }
  };

  return <AuthForm type="login" onSubmit={handleLogin} />;
}
