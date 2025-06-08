"use client";
import Button from "@/app/components/CustomButton";
import CustomInput from "@/app/components/CustomInput";
import React, { useState } from "react";
import { FaLock, FaUnlock } from "react-icons/fa";
import Heading from "@/app/components/Heading";

const Page = () => {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    country: "",
    streetAddress: "",
    city: "",
    state: "",
    postalCode: "",
    oldPass: "",
    newPass: "",
    confirmPass: "",
  });
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  return (
    <div className="my-8 mx-16">
      <Heading
        title="My Account"
        subtitle="Edit your account preferences and provide correct details"
      />
      <form className="mt-12">
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-xl font-semibold leading-7 text-n-1">
              Profile
            </h2>
            <p className="mt-1 text-sm leading-6 text-n-2">
              This information will be displayed publicly so be careful what you
              share.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
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
                <div className="mt-2 flex items-center gap-x-3">
                  <svg
                    className="h-48 w-48 "
                    viewBox="0 0 24 24"
                    fill="#fff"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <Button white>Change</Button>
                </div>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-xl font-semibold leading-7 text-n-1">
              Personal Information
            </h2>
            <p className="mt-1 text-sm leading-6 text-n-2">
              Use a permanent address where you can receive mail.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
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
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
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
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
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
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="street-address"
                  className="block text-sm font-semibold leading-6 text-n-3"
                >
                  Street address
                </label>
                <div className="mt-2">
                  <CustomInput
                    type="text"
                    name="streetAddress"
                    hint={"123 Main St"}
                    value={values.streetAddress}
                    handler={changeHandler}
                  />
                </div>
              </div>

              <div className="sm:col-span-2 sm:col-start-1">
                <label
                  htmlFor="city"
                  className="block text-sm font-semibold leading-6 text-n-3"
                >
                  City
                </label>
                <div className="mt-2">
                  <CustomInput
                    type="text"
                    name="city"
                    hint="New York"
                    value={values.city}
                    handler={changeHandler}
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="region"
                  className="block text-sm font-semibold leading-6 text-n-3"
                >
                  State / Province
                </label>
                <div className="mt-2">
                  <CustomInput
                    type="text"
                    name="state"
                    hint="Calemanton"
                    value={values.state}
                    handler={changeHandler}
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="postal-code"
                  className="block text-sm font-semibold leading-6 text-n-3"
                >
                  ZIP / Postal code
                </label>
                <div className="mt-2">
                  <CustomInput
                    type="text"
                    name="postalCode"
                    hint="78130"
                    value={values.postalCode}
                    handler={changeHandler}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <Button white>Save</Button>
        </div>
      </form>
      <div className="my-8 border border-gray-700" />
      <form className="mt-12">
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-xl font-semibold leading-7 text-n-1">
              Update Password
            </h2>
            <p className="mt-1 text-sm leading-6 text-n-3">
              Choose a Strong Password includes numbers, letters and characters.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="oldPass"
                  className="block text-sm font-bold leading-6 text-n-3"
                >
                  Old Password
                </label>
                <div className="mt-2 relative">
                  <FaLock className="absolute top-4 left-4 text-gray-400" />
                  <CustomInput
                    type="password"
                    name="oldPass"
                    hint="*****"
                    value={values.oldPass}
                    handler={changeHandler}
                    classes="pl-10"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="newPass"
                  className="block text-sm font-semibold leading-6 text-n-3"
                >
                  New Password
                </label>
                <div className="mt-2 relative">
                  <FaUnlock className="absolute top-4 left-4 text-gray-400" />
                  <CustomInput
                    type="password"
                    name="newPass"
                    hint="******"
                    classes="pl-10"
                    value={values.newPass}
                    handler={changeHandler}
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="confirmPass"
                  className="block text-sm font-semibold leading-6 text-n-3"
                >
                  Confirm Password
                </label>
                <div className="mt-2 relative">
                  <FaLock className="absolute top-4 left-4 text-gray-400" />
                  <CustomInput
                    type="password"
                    name="confirmPass"
                    hint="******"
                    value={values.confirmPass}
                    handler={changeHandler}
                    classes="pl-10"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          {/* <button type="button" className="text-sm font-semibold leading-6 ">
            Cancel
          </button> */}
          <Button white>
            Update
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Page;
