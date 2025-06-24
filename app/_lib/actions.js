'use server';

import { auth, signIn, signOut } from './Auth';
import { supabase } from './supabase';

export async function updateGuest(formData) {
  const session = await auth();
  if (!session) throw new Error('You must be logged in to update your guest profile.');

  const nationalID = formData.get('nationalID');
  const [nationality, countryFlag] = formData.get('nationality').split('%');

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID)) throw new Error('Please enter a valid National ID number.');
  if (!session.user?.guestId) throw new Error('Missing guest ID in session.');

  const updateData = {
    nationality,
    countryFlag,
    nationalID,
  };

  const { data, error } = await supabase.from('guests').update(updateData).eq('id', session.user.guestId);

  if (error) throw new Error('Guest could not be updated');
}

export async function signInAction() {
  await signIn('google', { redirectTo: '/account' });
}

export async function signOutAction() {
  await signOut({ redirectTo: '/' });
}
