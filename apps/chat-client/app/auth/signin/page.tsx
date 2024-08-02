"use client";
import Button from "@/components/Button";
import LabelledInput from "@/components/LabelledInput";
import NamedCard from "@/components/NamedCard";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const SignInPage = () => {
  const router = useRouter();
  const [formdata, setFormdata] = useState({
    phone: "",
    password: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (formdata.phone && formdata.password) {
      console.log(formdata);

      await signIn("credentials", {
        ...formdata,
        redirect: false,
      });
      router.push("/");
    } else {
      alert("Check credentials and try again");
      router.push("/auth/signin");
    }
  };
  return (
    <div>
      <div className="h-screen grid place-items-center bg-gray-800">
        <NamedCard name="SignUp">
          <LabelledInput
            name="Phone"
            placeholder="9876543211"
            type="text"
            onChange={handleChange}
          />
          <LabelledInput
            name="Password"
            placeholder="password"
            type="password"
            onChange={handleChange}
          />
          <Button
            onClick={async () => {
              if (formdata.phone && formdata.password) {
                const res = await signIn("credentials", {
                  ...formdata,
                  redirect: false,
                });
                if (!res?.error) {
                  router.push("/");
                } else {
                  alert("Check credentials and try again");
                  router.push("/auth/signin");
                }
              } else {
                alert("Check credentials and try again");
                router.push("/auth/signin");
              }
            }}
          >
            Sign In
          </Button>
          <div className="text-sm text-gray-400">
            Don&apos;t Have a account?{" "}
            <Link
              href={"/auth/signup"}
              className="italic underline hover:text-white"
            >
              Create one
            </Link>
          </div>
        </NamedCard>
      </div>
    </div>
  );
};

export default SignInPage;
