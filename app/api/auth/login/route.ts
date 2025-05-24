import { dbConnect } from '@/app/lib/db';
import User from '@/app/models/User';


export async function POST(req: Request) {
  await dbConnect();

  const { email, password } = await req.json();

  if (!email || !password) {
    return Response.json(
      { error: 'Email and password are required' },
      { status: 400 }
    );
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return Response.json({ error: 'User not found' }, { status: 404 });
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return Response.json({ error: 'Invalid password' }, { status: 401 });
    }

    return Response.json(
      { message: 'User logged in successfully', user },
      { status: 200 }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json(
      { error: 'An unknown error occurred' },
      { status: 500 }
    );
  }
}
