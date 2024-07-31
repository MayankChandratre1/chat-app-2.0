"use client"
import Loader from "@/components/Loader";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";


export default function Home() {
  const user = useSession()
  const router = useRouter()

  if(user.status == "loading"){
    return (
      <div className="bg-blue-950 min-h-screen p-5 grid place-items-center">
      <Loader />
  </div>
    )
  }else if(user.status == "unauthenticated"){
    router.push("/auth/signin")
  }else{
    setTimeout(()=>{
      router.push("/dashboard/base")
    },1000)
  }


  return (
    <div className="bg-gray-900 min-h-screen p-5 grid place-items-center">
        <Loader />
    </div>
  );
}
