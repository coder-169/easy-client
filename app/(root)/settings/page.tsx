"use client";
import Button from "@/app/components/CustomButton";
import CustomInput from "@/app/components/CustomInput";
import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash, FaLock, FaUnlock } from "react-icons/fa";
import Heading from "@/app/components/Heading";
import { getSession, useSession } from "next-auth/react";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import Image from "next/image";
import ProtectedRoute from "@/app/components/ProtectedRoute";

const Page = () => {
  const [type, setType] = useState("password");
  const [loading, setLoading] = useState(true);
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
  });
  const [passwords, setPasswords] = useState({
    oldPass: "",
    newPass: "",
    confirmPass: "",
  });
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);
  const { data: session, update } = useSession();

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const passwordChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatarFile(file);

      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "your_upload_preset");

    try {
      const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`;
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };

  const updateAvatar = async () => {
    if (!avatarFile) return;

    setBtnLoading(true);
    try {
      const url = await uploadImage(avatarFile);
      if (!url) {
        throw new Error("Image upload failed");
      }

      const resp = await fetch("/api/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ avatar: url }),
      });
      const data = await resp.json();

      if (!resp.ok) {
        throw new Error(data.message || "Failed to update avatar");
      }

      toast.success("Avatar updated successfully");
      await update({ ...session, user: { ...session?.user, avatar: url } });
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setBtnLoading(false);
    }
  };

  const updateProfile = async () => {
    setBtnLoading(true);
    try {
      const fastSession = await getSession();
      const resp = await fetch("/api/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          id: fastSession?.user?._id,
        },
        body: JSON.stringify(values),
      });
      const data = await resp.json();

      if (!resp.ok) {
        throw new Error(data.message || "Failed to update profile");
      }
      toast.success("Profile updated successfully");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setBtnLoading(false);
    }
  };

  const updatePasswords = async () => {
    if (passwords.newPass !== passwords.confirmPass) {
      return toast.error("New passwords don't match");
    }

    setBtnLoading(true);
    try {
      const resp = await fetch("/api/user/password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          headers: session?.user?._id,
        },
        body: JSON.stringify({
          oldPassword: passwords.oldPass,
          newPassword: passwords.newPass,
        }),
      });
      const data = await resp.json();

      if (!resp.ok) {
        throw new Error(data.message || "Failed to update password");
      }

      toast.success("Password updated successfully");
      setPasswords({
        oldPass: "",
        newPass: "",
        confirmPass: "",
      });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setBtnLoading(false);
    }
  };

  useEffect(() => {
    if (session) {
      setValues({ ...values, ...session?.user });
      setLoading(false);
    }
  }, [session]);

  return (
    <ProtectedRoute>
      <div className="my-12 mx-2 sm:mx-4 md:mx-8 lg:mx-16">
        <Heading
          title="Edit Profile"
          subtitle="Edit your account preferences and provide correct details"
        />
        {loading ? (
          <Skeleton className="h-[70vh] w-full" />
        ) : (
          <>
            <form className="mt-6 md:mt-12" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-8 md:space-y-12">
                <div className="border-b border-gray-900/10 pb-8 md:pb-12">
                  <h2 className="text-lg md:text-xl font-semibold leading-7 text-n-1">
                    Profile
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-n-2">
                    This information will be displayed publicly so be careful
                    what you share.
                  </p>

                  <div className="mt-6 md:mt-10 grid grid-cols-1 gap-x-4 md:gap-x-6 gap-y-6 md:gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-6 md:sm:col-span-4">
                      <label
                        htmlFor="username"
                        className="block text-sm font-semibold leading-6 text-n-3"
                      >
                        Username
                      </label>
                      <div className="mt-2">
                        <CustomInput
                          type="text"
                          name="username"
                          hint="janesmith"
                          value={values.username}
                          handler={changeHandler}
                          readOnly={true}
                          classes="opacity-90 w-full"
                        />
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label
                        htmlFor="photo"
                        className="block text-sm font-semibold leading-6 text-n-3"
                      >
                        Photo
                      </label>
                      <div className="mt-2 flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-x-3">
                        <div className="flex-shrink-0">
                          {avatarPreview ? (
                            <Image
                              src={avatarPreview}
                              alt="Profile"
                              width={192}
                              height={192}
                              className="h-32 w-32 md:h-48 md:w-48 rounded-full object-cover"
                            />
                          ) : (
                            <div className="h-32 w-32 md:h-48 md:w-48 rounded-full bg-gray-300 flex items-center justify-center">
                              <svg
                                className="h-24 w-24 text-gray-500"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                aria-hidden="true"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
                          <label htmlFor="avatar-upload" className="w-full md:w-auto">
                            <Button white className="w-full md:w-auto">
                              Change
                            </Button>
                            <input
                              id="avatar-upload"
                              type="file"
                              className="hidden"
                              accept="image/*"
                              onChange={handleAvatarChange}
                            />
                          </label>
                          {avatarFile && (
                            <Button
                              onClick={updateAvatar}
                              white
                              className="w-full md:w-auto"
                              loading={btnLoading}
                            >
                              Save Avatar
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-b border-gray-900/10 pb-8 md:pb-12">
                  <h2 className="text-lg md:text-xl font-semibold leading-7 text-n-1">
                    Personal Information
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-n-2">
                    Use a permanent address where you can receive mail.
                  </p>

                  <div className="mt-6 md:mt-10 grid grid-cols-1 gap-x-4 md:gap-x-6 gap-y-6 md:gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-6 md:sm:col-span-3">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-semibold leading-6 text-n-3"
                      >
                        First name
                      </label>
                      <div className="mt-2">
                        <CustomInput
                          type="text"
                          name="firstName"
                          hint="Jane"
                          value={values.firstName}
                          handler={changeHandler}
                          classes="w-full"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-6 md:sm:col-span-3">
                      <label
                        htmlFor="last-name"
                        className="block text-sm font-semibold leading-6 text-n-3"
                      >
                        Last name
                      </label>
                      <div className="mt-2">
                        <CustomInput
                          type="text"
                          name="lastName"
                          hint={"Doe"}
                          value={values.lastName}
                          handler={changeHandler}
                          classes="w-full"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-6 md:sm:col-span-4">
                      <label
                        htmlFor="email"
                        className="block text-sm font-semibold leading-6 text-n-3"
                      >
                        Email address
                      </label>
                      <div className="mt-2">
                        <CustomInput
                          name="email"
                          type="email"
                          hint="janedoe@gmail.com"
                          value={values.email}
                          handler={changeHandler}
                          readOnly={true}
                          classes="opacity-80 w-full"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-end">
                <Button
                  disabled={btnLoading}
                  onClick={updateProfile}
                  white
                  loading={btnLoading}
                  className="w-full md:w-1/5"
                >
                  Save
                </Button>
              </div>
            </form>
            <div className="my-6 md:my-8 border border-gray-700" />
            <form className="mt-6 md:mt-12" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-8 md:space-y-12">
                <div className="border-b border-gray-900/10 pb-8 md:pb-12">
                  <h2 className="text-lg md:text-xl font-semibold leading-7 text-n-1">
                    Update Password
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-n-3">
                    Choose a Strong Password includes numbers, letters and
                    characters.
                  </p>

                  <div className="mt-6 md:mt-10 grid grid-cols-1 gap-x-4 md:gap-x-6 gap-y-6 md:gap-y-8 sm:grid-cols-6">
                    <div className="relative sm:col-span-6 md:sm:col-span-4">
                      <label
                        htmlFor="oldPass"
                        className="block text-sm font-bold leading-6 text-n-3"
                      >
                        Old Password
                      </label>
                      <div className="mt-2 relative">
                        <FaLock className="absolute top-4 left-4 text-gray-400" />
                        <CustomInput
                          type={type}
                          name="oldPass"
                          hint="*****"
                          value={passwords.oldPass}
                          handler={passwordChangeHandler}
                          classes="pl-10 w-full"
                        />
                        <button
                          className="absolute top-[51px] right-4 text-white"
                          onClick={() =>
                            setType(type === "password" ? "text" : "password")
                          }
                        >
                          {type === "text" ? <FaEyeSlash /> : <FaEye />}
                        </button>
                      </div>
                    </div>
                    <div className="sm:col-span-6 md:sm:col-span-3">
                      <label
                        htmlFor="newPass"
                        className="block text-sm font-semibold leading-6 text-n-3"
                      >
                        New Password
                      </label>
                      <div className="mt-2 relative">
                        <FaUnlock className="absolute top-4 left-4 text-gray-400" />
                        <CustomInput
                          type={type}
                          name="newPass"
                          hint="******"
                          classes="pl-10 w-full"
                          value={passwords.newPass}
                          handler={passwordChangeHandler}
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-6 md:sm:col-span-3">
                      <label
                        htmlFor="confirmPass"
                        className="block text-sm font-semibold leading-6 text-n-3"
                      >
                        Confirm Password
                      </label>
                      <div className="mt-2 relative">
                        <FaLock className="absolute top-4 left-4 text-gray-400" />
                        <CustomInput
                          type={type}
                          name="confirmPass"
                          hint="******"
                          value={passwords.confirmPass}
                          handler={passwordChangeHandler}
                          classes="pl-10 w-full"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-end">
                <Button
                  className="w-full md:w-1/5"
                  onClick={updatePasswords}
                  white
                  loading={btnLoading}
                >
                  Update
                </Button>
              </div>
            </form>
          </>
        )}
      </div>
    </ProtectedRoute>
  );
};

export default Page;