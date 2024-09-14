import NextAuth, { AuthError } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import connectmonogo from "./mogodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
     
    },
    
  ),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectmonogo(); 

        const user = await User.findOne({ email: credentials.email });
        if (!user) {
          throw new Error("No user found with this email");
        }

        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
        if (!isPasswordValid) {
          throw new Error("Password is incorrect");
        }

        return { email: user.email, name: user.name };
      },
    }),
  ],callbacks:{
    signIn:async({user,account})=>{
      if(account?.provider=="google"){
        try{
          const {email,name,id}=user;
          await connectmonogo();
          const aleradyuser=await User.findOne({email});
          if(!aleradyuser)await User.create({email,name,googleId:id});
          // console.log(aleradyuser);
         
          
          return true;
        }catch(error){
          console.error("Error during Google sign-in:", error);
          throw new AuthError("Error while creating user");
        }

      }
      return true;
    }
  },
  pages: {
    signIn: '/auth/signup',
  }
});
