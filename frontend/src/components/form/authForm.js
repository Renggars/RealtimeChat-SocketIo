"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import Link from "next/link";

export default function AuthForm({ type = "login", onSubmit, loading }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (type === "register") {
      onSubmit({ username, email, password });
    } else {
      onSubmit({ email, password });
    }
  };

  return (
    <section className="bg-gray-50 min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow border">
        <div className="p-6 space-y-6">
          <h1 className="text-2xl font-bold text-gray-900 text-center">
            {type === "register"
              ? "Create an account"
              : "Login to your account"}
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            {type === "register" && (
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-900">
                  Username
                </label>
                <Input
                  type="text"
                  placeholder="Your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            )}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-900">
                Email
              </label>
              <Input
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-900">
                Password
              </label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 cursor-pointer"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <Loader className="animate-spin mr-2 h-4 w-4" />
                  Loading...
                </span>
              ) : type === "register" ? (
                "Create an account"
              ) : (
                "Login"
              )}
            </Button>
          </form>
          <p className="text-sm text-gray-600 text-center">
            {type === "register" ? (
              <>
                Already have an account?{" "}
                <Link
                  href="/auth/login"
                  className="font-medium text-blue-600 hover:underline"
                >
                  Login here
                </Link>
              </>
            ) : (
              <>
                Don’t have an account yet?{" "}
                <Link
                  href="/auth/register"
                  className="font-medium text-blue-600 hover:underline"
                >
                  Register
                </Link>
              </>
            )}
          </p>
        </div>
      </div>
    </section>
  );
}
