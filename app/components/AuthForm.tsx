"use client";
import Link from "next/link";
import React, { FormEvent, useState } from "react";
import Input from "./CustomInput";
import Button from "./Button";
import Logo from "./Logo";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
const AuthForm = ({ type }: { type: string }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    dob: "",
    id_number: "",
    confirmPassword: "",
  });
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  // 2. Define a submit handler.
  const onSubmitSign = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    if (type === "sign-in") {
      signIn('credentials', {
        redirect: true,
        callbackUrl: '/',
        ...user,
        name: user.username,
      }).then((dt) => {
        if(dt?.ok){
          console.log(dt)
          toast.success('Logged in Successfully')
        }else{
          console.log(dt?.error)
        }
      }).catch((err) => {
        console.log(err)
        toast.error("Invalid Credentials")
      })
    } else {
      if (user.password !== user.confirmPassword)
        return alert("Both passwords do not match");
      const resp = await fetch("/api/auth/register", {
        method: "post",
        body: JSON.stringify(user),
      });
      const data = await resp.json();
      if (data.success) {
        alert("account created Successfully");
      } else {
        console.error(data.message);
      }
    }
    console.log(type);
    console.log(user);
    setIsLoading(false);
  };

  return (
    <section className="h-full w-full">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link
          href={"/"}
          className="flex cursor-pointer justify-center items-center gap-1 px-4 my-8"
        >
          <Logo />
        </Link>
 
      </header>
      <>
        <form onSubmit={onSubmitSign} className="space-y-6">
          {type === "sign-in" ? (
            <>
              {" "}
              <Input
                type="text"
                hint={"Enter your email or Username"}
                label={"Login Id"}
                name={"username"}
                value={user.username}
                handleChange={onChangeHandler}
              />
              <Input
                type="password"
                hint={"********"}
                label={"Password"}
                value={user.password}
                handleChange={onChangeHandler}
                name={"password"}
              />
            </>
          ) : (
            <>
              <div className="flex gap-2 justify-between">
                <Input
                  type="text"
                  hint={"John"}
                  label={"First Name"}
                  name={"firstName"}
                  classes="w-1/2"
                  value={user.firstName}
                  handleChange={onChangeHandler}
                />
                <Input
                  type="text"
                  hint={"Doe"}
                  label={"Last Name"}
                  name={"lastName"}
                  classes="w-1/2"
                  value={user.lastName}
                  handleChange={onChangeHandler}
                />
              </div>

              <div className="flex gap-2 justify-between">
                <Input
                  type="date"
                  hint={"YYYY-MM-DD"}
                  label={"Date of Birth"}
                  value={user.dob}
                  handleChange={onChangeHandler}
                  name={"dob"}
                  classes="w-1/2"
                />
                <Input
                  type="text"
                  hint={"45303-1234123-4"}
                  label={"Id Number"}
                  value={user.id_number}
                  handleChange={onChangeHandler}
                  name={"id_number"}
                  classes="w-1/2"
                />
              </div>

              <div className="flex gap-2 justify-between">
                <Input
                  type="email"
                  hint={"Enter your email"}
                  label={"Email"}
                  value={user.email}
                  handleChange={onChangeHandler}
                  name={"email"}
                />
                <Input
                  type="text"
                  hint={"Johnboe12"}
                  label={"Username"}
                  value={user.username}
                  handleChange={onChangeHandler}
                  name={"username"}
                />
              </div>
              <div className="flex gap-2 justify-between">
                <Input
                  type="password"
                  hint={"********"}
                  label={"Password"}
                  value={user.password}
                  handleChange={onChangeHandler}
                  name={"password"}
                />
                <Input
                  type="password"
                  hint={"********"}
                  label={"Confirm Password"}
                  value={user.confirmPassword}
                  handleChange={onChangeHandler}
                  name={"confirmPassword"}
                />
              </div>
            </>
          )}
          <div className="flex flex-col gap-4">
            <Button
              disabled={isLoading}
              type="submit"
              classes="w-1/2 mx-auto text-white"
              text={type === "sign-in" ? "Sign In" : "Sign Up"}
            />{" "}
          </div>
        </form>
        <div className="mt-2 flex justify-center gap-1">
          <p className="text-sm font-normal text-gray-600 ">
            {type === "sign-in"
              ? "Don't have an account?"
              : "Already have an account?"}
            <Link
              href={type === "sign-in" ? "/sign-up" : "/sign-in"}
              className="text-blue-400 hover:text-blue-500 transition-all duration-200"
            >
              {type === "sign-in" ? " Sign Up" : " Sign In"}
            </Link>
          </p>
        </div>
      </>
    </section>
  );
};

export default AuthForm;
