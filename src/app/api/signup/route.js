import connectmonogo from "@/lib/mogodb";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import { z } from "zod";

// Define Zod schema for validation
const signupSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters long' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
});

export async function POST(req) {
  const body = await req.json();

  // Validate the request body using Zod
  const validation = signupSchema.safeParse(body);
  
  if (!validation.success) {
    // Return validation error messages if validation fails
    return new Response(
      JSON.stringify({ errors: validation.error.format() }),
      { status: 400 }
    );
  }

  const { name, email, password } = validation.data;

  await connectmonogo();

  // Check if the user already exists
  const existuser = await User.findOne({ email });
  if (existuser) {
    return new Response(
      JSON.stringify({ message: 'User already exists' }),
      { status: 400 }
    );
  }

  // Hash the password before storing in the database
  const hashedPassword = await bcrypt.hash(password, 12);

  // Create a new user with the validated data
  const user = new User({
    name,
    email,
    password: hashedPassword,
  });

  await user.save();

  // Respond with success message after user creation
  return new Response(
    JSON.stringify({ message: 'User created' }),
    { status: 201 }
  );
}
