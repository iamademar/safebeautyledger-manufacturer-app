import { NextApiRequest, NextApiResponse } from 'next';
import { getIronSession } from 'iron-session';
import { sessionOptions, SessionData } from '../lib/session';
import { login } from './api';

export async function loginHandler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getIronSession<SessionData>(req, res, sessionOptions);

  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      const { user } = await login(email, password);
      session.user = {
        id: user.id,
        email: user.email,
        name: user.name,
      };
      await session.save();

      res.json({ success: true, user: session.user });
    } catch (error) {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

export async function getUserSession(req: NextApiRequest, res: NextApiResponse) {
  const session = await getIronSession<SessionData>(req, res, sessionOptions);
  return session.user;
}

export async function logout(req: NextApiRequest, res: NextApiResponse) {
  const session = await getIronSession<SessionData>(req, res, sessionOptions);
  session.destroy();
  res.json({ success: true });
}