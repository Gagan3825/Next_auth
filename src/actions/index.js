'use server'

import { signIn } from "@/lib/auth";
import { redirect } from "next/navigation";


export async function handlegooglesignin(){

   const data = await signIn("google", { redirectTo: '/home'});
}