import bcrypt, { hash } from "bcryptjs"
import connectmonogo from "@/lib/mogodb"
import User from "@/models/User"

export async function POST(req) {
    const {email,password}=await req.json()
    await connectmonogo();

    const isemail=await User.findOne({email:email});
    if(!isemail){
        return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 });
    }
    const ispass=await bcrypt.compare(password,isemail.password);
    if(!ispass){
        return new Response(JSON.stringify({ message: 'User password incorrect' }), { status: 401 });
    }
    
        return new Response(JSON.stringify({ message: 'User successfully' }), { status: 201 })
   
}