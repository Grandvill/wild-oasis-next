'use server';

import { revalidatePath } from 'next/cache';
import { auth, signIn, signOut } from './Auth';
import { supabase } from './supabase';
import { getBookings } from './data-service';

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

  // revalidate berfungsi untuk memperbarui cache halaman ini tanpa perlu refresh browser
  revalidatePath('/account/profile');
}

export async function deleteReservation(bookingId) {
  const session = await auth();
  if (!session) throw new Error('You must be logged in to delete a reservation.');

  const guestBookings = await getBookings(session.user.guestId);
  if (!guestBookings.includes(bookingId)) throw new Error('You are not allowed to delete this booking.');

  const { error } = await supabase.from('bookings').delete().eq('id', bookingId);

  if (error) {
    console.error(error);
    throw new Error('Booking could not be deleted');
  }
  revalidatePath('/account/reservations');
}

export async function signInAction() {
  await signIn('google', { redirectTo: '/account' });
}

export async function signOutAction() {
  await signOut({ redirectTo: '/' });
}
