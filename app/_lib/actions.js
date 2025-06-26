'use server';

import { revalidatePath } from 'next/cache';
import { auth, signIn, signOut } from './Auth';
import { supabase } from './supabase';
import { getBookings } from './data-service';
import { redirect } from 'next/navigation';

// action.js : file ini digunakan untuk logic yang berkaitan dengan session, validasi user, dan revalidate cache setelah operasi data
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

  // revalidate berfungsi untuk memperbarui cache halaman ini tanpa perlu refresh browser / biar ga ada cache lama yang masih tersimpan
  revalidatePath('/account/profile');
}

export async function deleteReservation(bookingId) {
  const session = await auth();
  if (!session) throw new Error('You must be logged in to delete a reservation.');

  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingsIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingsIds.includes(bookingId)) throw new Error('You are not allowed to delete this booking.');
  const { error } = await supabase.from('bookings').delete().eq('id', bookingId);

  if (error) {
    console.error(error);
    throw new Error('Booking could not be deleted');
  }
  revalidatePath('/account/reservations');
}

export async function updateReservation(formData) {
  const bookingId = Number(formData.get('bookingId'));

  // 1. Authentication: check if user is logged in
  const session = await auth();
  if (!session) throw new Error('You must be logged in to update a reservation.');

  // 2. Authorization: check if the booking belongs to the logged-in user
  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingsIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingsIds.includes(bookingId)) throw new Error('You are not allowed to update this booking.');

  // 3. Buidling the update data
  const updateData = {
    numGuests: Number(formData.get('numGuests')),
    observations: formData.get('observations').slice(0, 100), // ambil hanya 100 karakter pertama
  };

  // 4. Mutation : update the booking
  const { error } = await supabase.from('bookings').update(updateData).eq('id', bookingId).select().single();

  // 5. Error handling
  if (error) throw new Error('Booking could not be updated');

  // 6. revalidate the reservations page to reflect the changes / biar ga ada cache lama yang masih tersimpan
  revalidatePath(`/account/reservations/edit/${bookingId}`);
  revalidatePath('/account/reservations');

  // 7. redirecting the user to the reservations page
  redirect(`/account/reservations`);
}

export async function signInAction() {
  await signIn('google', { redirectTo: '/account' });
}

export async function signOutAction() {
  await signOut({ redirectTo: '/' });
}
