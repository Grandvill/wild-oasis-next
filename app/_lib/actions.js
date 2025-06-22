'use server';

import { signIn } from './Auth';

export async function signInAction() {
  await signIn('google', { redirectTo: '/account' });
}
