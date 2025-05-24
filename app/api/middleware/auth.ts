import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import User from '@/app/models/User';

interface AuthenticatedRequest extends Request {
  user?: { id: string; username: string };
}

export default async function auth(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.cookies.token;
    if (!token) throw new Error('No auth token');

    const secret = process.env.JWT_SECRET!;
    const decoded = jwt.verify(token, secret) as JwtPayload;

    const user = await User.findById(decoded.userId);
    if (!user) throw new Error('User not found');

    (req as AuthenticatedRequest).user = {
      id: user._id.toString(),
      username: user.username,
    };

    next();
  } catch (err) {
    next(err);
  }
}
