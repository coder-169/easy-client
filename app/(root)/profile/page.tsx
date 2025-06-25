"use client";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import {
  FiEdit,
  FiUser,
  FiMail,
  FiCreditCard,
  FiCalendar,
  FiLock,
} from "react-icons/fi";
import { SiEthereum } from "react-icons/si";
import { FaMoneyBillWave } from "react-icons/fa";
import Heading from "@/app/components/Heading";
import Button from "@/app/components/CustomButton";
import AnimatedCounter from "@/app/components/AnimatedCounter";
import { toast } from "sonner";
import Image from "next/image";
import ProtectedRoute from "@/app/components/ProtectedRoute";

const ProfilePage = () => {
  const { data: session } = useSession();
  return (
    <ProtectedRoute>
      <div className="my-8 mx-4 md:mx-16">
        <div className="flex justify-between items-center mb-8">
          <Heading
            title="My Profile"
            subtitle="View and manage your personal and account information"
          />
          <Button
            white
            href="/settings"
            className="flex items-center gap-2"
          >
            Edit Profile
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* User Profile Section */}
          <div className="lg:col-span-2 bg-n-7 p-6 rounded-xl border border-n-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Avatar Section */}
              <div className="flex flex-col items-center">
                <div className="relative w-32 h-32 rounded-full bg-n-6 flex items-center justify-center mb-4">
                  {session?.user?.avatar ? (
                    <Image
                      src={session.user.avatar}
                      alt="Profile"
                      width={128}
                      height={128}
                      className="rounded-full object-cover"
                    />
                  ) : (
                    <FiUser className="text-4xl text-n-3" />
                  )}
                </div>
              </div>

              {/* User Details */}
              <div className="flex-1 space-y-4">
                <h3 className="text-xl font-semibold text-n-1 flex items-center gap-2">
                  <FiUser /> Personal Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-n-3 mb-1 block">
                      First Name
                    </label>
                    <p className="bg-n-8 p-2 text-n-2 rounded-lg">
                      {session?.user?.firstName}
                    </p>
                  </div>

                  <div>
                    <label className="text-sm text-n-3 mb-1 block">
                      Last Name
                    </label>
                    <p className="bg-n-8 p-2 text-n-2 rounded-lg">
                      {session?.user?.lastName}
                    </p>
                  </div>

                  <div className="md:col-span-2">
                    <label className="text-sm text-n-3 mb-1 flex items-center gap-1">
                   Email
                    </label>
                    <p className="bg-n-8 p-2 text-n-2 rounded-lg opacity-80">
                      {session?.user?.email}
                    </p>
                  </div>

                  <div>
                    <label className="text-sm text-n-3 mb-1 flex items-center gap-1">
                     Date of Birth
                    </label>
                    <p className="bg-n-8 p-2 text-n-2 rounded-lg">
                      {new Date(session?.user?.dob).toLocaleDateString()}
                    </p>
                  </div>

                  <div>
                    <label className="text-sm text-n-3 mb-1 flex items-center gap-1">
                      CNIC
                    </label>
                    <p className="bg-n-8 p-2 text-n-2 rounded-lg">
                      {session?.user?.cnic}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Account Information Section */}
          <div className="bg-n-7 p-6 rounded-xl border border-n-6">
            <h3 className="text-xl font-semibold text-n-1 flex items-center gap-2 mb-6">
              <FiCreditCard /> Account Information
            </h3>

            <div className="space-y-6">
              <div>
                <label className="text-sm text-n-3 mb-1 block">
                  Account Number
                </label>
                <p className="bg-n-8 p-3 text-n-2 rounded-lg font-mono">
                  {session?.user?.accountNumber}
                </p>
              </div>

              <div>
                <label className="text-sm text-n-3 mb-1 flex items-center gap-1">
                  <SiEthereum /> Ethereum Balance
                </label>
                <div className="bg-n-8 p-3 text-n-2 rounded-lg">
                  <AnimatedCounter
                    amount={session?.user?.balanceEth}
                    prefix="ETH "
                    classes="font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-n-3 mb-1 flex items-center gap-1">
                  <FaMoneyBillWave /> PKR Balance
                </label>
                <div className="bg-n-8 p-3 text-n-2 rounded-lg">
                  <AnimatedCounter
                    amount={session?.user?.balancePkr}
                    prefix="PKR "
                    classes="font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-n-3 mb-1 block">
                  Member Since
                </label>
                <p className="bg-n-8 p-3 text-n-2 rounded-lg">
                  {new Date(session?.user?.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default ProfilePage;
