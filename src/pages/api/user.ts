import { NextApiRequest, NextApiResponse } from 'next';
import { getUserSession } from '@/services/authentication';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const sessionUser = await getUserSession(req, res);
  if (sessionUser) {
    res.json({ user: { id: sessionUser.id, name: sessionUser.name, email: sessionUser.email } });
  } else {
    res.json({ user: null });
  }
}