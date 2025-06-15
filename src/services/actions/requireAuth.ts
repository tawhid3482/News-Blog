'use server';

import { cookies } from 'next/headers';
import { authKey } from '@/contants/authkey';
import { redirect } from 'next/navigation';

export const requireAuth = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get(authKey)?.value;

  if (!token) {
    redirect('/signin'); // Token না থাকলে sign-in page এ পাঠাবে
  }

  return token; // থাকলে token রিটার্ন করবে
};
