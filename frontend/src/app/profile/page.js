"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";

import { Camera, Mail, User, LoaderCircle, Check, Info } from "lucide-react";
import Image from "next/image";

const ProfilePage = () => {
  const {
    authUser,
    checkAuth,
    isCheckingAuth,
    updatePicture,
    updateUsername,
    isUpdatingPicture,
    isUpdatingUsername,
  } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newUsername, setNewUsername] = useState(authUser?.username || "");
  const router = useRouter();

  useEffect(() => {
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isCheckingAuth && !authUser) {
      router.push("/auth/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCheckingAuth, authUser]);

  if (isCheckingAuth || !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoaderCircle className="size-10 animate-spin" />
      </div>
    );
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    console.log(e.target.files[0]);
    if (!file) return;

    setSelectedImg(URL.createObjectURL(file));
    const formData = new FormData();
    formData.append("profilePic", file);

    await updatePicture(formData);
  };

  const handleSaveUsername = async () => {
    if (!newUsername.trim() || newUsername === authUser?.username) {
      setIsEditing(false);
      return;
    }

    try {
      await updateUsername({ username: newUsername });
    } finally {
      setIsEditing(false);
    }
  };

  return (
    <div className="h-screen pt-20 bg-white">
      <div className="max-w-2xl mx-auto p-4 py-8 bg-gray-100 rounded-[3rem]">
        <div className="bg-base-300 rounded-xl p-6 space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold ">Profile</h1>
            <p className="mt-2">Your profile information</p>
          </div>

          {/* avatar upload section */}

          <div className="flex flex-col items-center gap-4">
            <div className="relative group w-32 h-32">
              {isUpdatingPicture ? (
                <div className="w-full h-full rounded-full flex items-center justify-center bg-gray-200">
                  <LoaderCircle className="w-8 h-8 animate-spin text-primary" />
                </div>
              ) : selectedImg || authUser?.profilePic ? (
                <Image
                  src={selectedImg || authUser.profilePic || "/avatar.png"}
                  alt="Profile"
                  width={100}
                  height={100}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <div className="w-full h-full rounded-full bg-[#00D757] flex items-center justify-center text-white text-3xl font-bold">
                  {authUser?.username?.charAt(0).toUpperCase()}
                </div>
              )}

              {!isUpdatingPicture && (
                <label
                  htmlFor="avatar-upload"
                  className="absolute inset-0 rounded-full flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-white"
                  style={{
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                  }}
                >
                  <Camera className="w-8 h-8 mb-1" />
                  <span className="text-sm">Ubah foto profil</span>
                  <input
                    type="file"
                    id="avatar-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={isUpdatingPicture}
                  />
                </label>
              )}
            </div>

            <div className="text-gray-500 flex items-center gap-1">
              <Info className="w-4 h-4" />
              <span>Maksimal ukuran file 1MB</span>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="xl:text-lg text-gray-600 flex items-center gap-2">
                <User className="w-4 h-4" />
                Username
              </div>
              {isEditing ? (
                <div className="relative px-4 py-2.5 bg-base-200 rounded-lg border-1 border-green-500">
                  <input
                    type="text"
                    value={newUsername}
                    disabled={isUpdatingUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSaveUsername();
                      if (e.key === "Escape") setIsEditing(false);
                    }}
                    autoFocus
                    className="w-full outline-none"
                  />

                  <span className="absolute right-12 top-1/2 -translate-y-1/2 text-gray-600 text-sm">
                    {newUsername.length}
                  </span>

                  <button
                    onClick={handleSaveUsername}
                    disabled={isUpdatingUsername}
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                  >
                    {isUpdatingUsername ? (
                      <LoaderCircle className="w-5 h-5 animate-spin text-primary" />
                    ) : (
                      <Check className="w-6 h-6 text-black hover:cursor-pointer" />
                    )}
                  </button>
                </div>
              ) : (
                <div
                  className="px-4 py-2.5 bg-base-200 rounded-lg border border-gray-300 cursor-pointer hover:bg-base-300 transition"
                  onClick={() => setIsEditing(true)}
                >
                  {authUser?.username}
                </div>
              )}
            </div>

            <div className="space-y-1.5">
              <div className="xl:text-lg text-gray-600 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border border-gray-300">
                {authUser?.email}
              </p>
            </div>
          </div>

          <div className="mt-6 bg-base-300 rounded-xl p-6">
            <h2 className="text-lg font-medium  mb-4">Account Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                <span>Member Since</span>
                <span>{authUser.createdAt?.split("T")[0]}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Account Status</span>
                <span className="text-green-500">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
