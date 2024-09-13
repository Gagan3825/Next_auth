// src/app/auth/signin/page.js
"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EnvelopeOpenIcon } from "@radix-ui/react-icons";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
// import { handlegooglesignin } from "./googlesignin";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { handlegooglesignin } from "@/app/actions";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router=useRouter();

  const handleSignin = async (e) => {
    e.preventDefault();
    const data= await fetch("/api/signin",{
      method:"POST",
      body:JSON.stringify({email,password}),
      headers:{ "Content-Type": "application/json" },
    })
    console.log(data);
    if(data.ok){
      const signInRes = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (signInRes.ok) {
        router.push("/home");
      } else {
        alert("sign-in failed");
      }
    }
    if(data.statusText==="Not Found"){
      alert("user not found ")
      setEmail('');
      setPassword('');
     
    }
    if(data.statusText==="Unauthorized"){
      alert("Password is incorrect");
      setPassword('');
    }
    

   
  };
  // const handlegooglesignin = async (e) => {
  //  const googlesignin= await signIn("google",{redirect:false});
  //  if(googlesignin.ok){
  //   router.push('/home');
  //  }else{
  //   alert("Google signin failed");
  //  }

  // };

  return (
    <div className="flex h-screen justify-center items-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Create project</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignin}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Email</Label>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="framework">Password</Label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                />
              </div>
              <Button type="submit">
                <EnvelopeOpenIcon className="mr-2 h-4 w-4" />
                Sign in
              </Button>
            </div>
          </form>
          <div className=" flex items-center justify-center">OR</div>
          <form action={handlegooglesignin}>
          <div className="grid w-full items-center gap-4">
            <button type="submit" >Sign in with Google</button>
          </div>
          </form>
          <Link href={'/auth/signup'}>New user? <span className="text-orange-500">Register</span></Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signin;
