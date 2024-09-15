import { NextApiRequest, NextApiResponse } from 'next';
import { logout } from '@/services/authentication';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await logout(req, res);
}