import connectmonogo from "@/lib/mogodb";
import bcrypt from "bcryptjs"
import User from "@/models/User";

export async function POST(req) {
    const{name,email,password}=await req.json();
    await connectmonogo();

    const existuser=await User.findOne({email});
    if (existuser) {
        return new Response(JSON.stringify({ message: 'User already exists' }), { status: 400 });
      }
      const hashedPassword = await bcrypt.hash(password, 12);
      const user=new User({name,email,password:hashedPassword});
      await user.save();
      
      
      return new Response(JSON.stringify({ message: 'User created' }), { status: 201 });


}