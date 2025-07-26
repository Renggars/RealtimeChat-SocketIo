"use client";

import AuthForm from "@/components/AuthForm";

export default function RegisterPage() {
  const handleRegister = async ({ email, password }) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`,
      {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      }
    );

    if (res.ok) {
      alert("Registrasi berhasil, silakan login");
      window.location.href = "/auth/login";
    } else {
      alert("Registrasi gagal");
    }
  };

  return <AuthForm type="register" onSubmit={handleRegister} />;
}
