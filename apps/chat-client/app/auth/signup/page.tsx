"use client";
import signup from "@/app/lib/actions/signup";
import Button from "@/components/Button";
import LabelledInput from "@/components/LabelledInput";
import NamedCard from "@/components/NamedCard";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const SignUpPage = () => {
  const router = useRouter();
  const [formdata, setFormdata] = useState({
    username: "",
    phone: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const signUpResult = await signup(formdata);
    if (signUpResult && !signUpResult.error) {
      const res = await signIn("credentials", {
        phone: formdata.phone,
        password: formdata.password,
        redirect: false,
      });
      if (res?.error) {
        alert("Something went wrong, Try again! ");
        router.push("/auth/signup");
      } else {
        router.push("/");
      }
    } else {
      alert("Something went wrong, Try Again! ");
      router.push("/auth/signup");
    }
  };

  return (
    <div className="h-screen grid place-items-center bg-gray-800">
      <NamedCard name="SignUp">
        <LabelledInput
          name="Username"
          placeholder="John Doe"
          type="text"
          onChange={handleChange}
        />
        <LabelledInput
          name="Phone"
          placeholder="9876543210"
          type="text"
          onChange={handleChange}
        />
        <LabelledInput
          name="Email"
          placeholder="johndoe@gmail.com"
          type="email"
          onChange={handleChange}
        />
        <LabelledInput
          name="Password"
          placeholder="password"
          type="password"
          onChange={handleChange}
        />
        <Button onClick={handleSubmit}>Sign Up</Button>
        <div className="text-sm text-gray-400">
          Already Have a account?{" "}
          <Link
            href={"/auth/signin"}
            className="italic underline hover:text-white"
          >
            Sign in
          </Link>
        </div>
      </NamedCard>
    </div>
  );
};

export default SignUpPage;
