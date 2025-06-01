import { eachDayOfInterval } from 'date-fns';
import { supabase } from './supabase';
import { notFound } from 'next/navigation';

// Define the types if needed (basic example below)
type Cabin = {
  id: number;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  image: string;
};

type Guest = {
  id?: number;
  email: string;
  fullName?: string;
};

type Booking = {
  id?: number;
  guestId: number;
  cabinId: number;
  startDate: string;
  endDate: string;
};

type BookingDateRange = {
  startDate: string;
  endDate: string;
};

/////////////
// GET

export async function getCabin(id: number) {
  const { data, error } = await supabase.from('cabins').select('*').eq('id', id).single();

  if (error) {
    console.error(error);
    notFound();
  }

  return data;
}

export async function getCabinPrice(id: number) {
  const { data, error } = await supabase.from('cabins').select('regularPrice, discount').eq('id', id).single();

  if (error) {
    console.error(error);
  }

  return data;
}

export async function getCabins(): Promise<Cabin[] | null> {
  const { data, error } = await supabase.from('cabins').select('id, name, maxCapacity, regularPrice, discount, image').order('name');

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be loaded');
  }

  return data;
}

export async function getGuest(email: string): Promise<Guest | null> {
  const { data } = await supabase.from('guests').select('*').eq('email', email).single();
  return data;
}

export async function getBooking(id: number): Promise<Booking | null> {
  const { data, error } = await supabase.from('bookings').select('*').eq('id', id).single();

  if (error) {
    console.error(error);
    throw new Error('Booking could not get loaded');
  }

  return data;
}

export async function getBookings(guestId: number): Promise<Booking[] | null> {
  const { data, error } = await supabase.from('bookings').select('id, created_at, startDate, endDate, numNights, numGuests, totalPrice, guestId, cabinId, cabins(name, image)').eq('guestId', guestId).order('startDate');

  if (error) {
    console.error(error);
    throw new Error('Bookings could not get loaded');
  }

  return data;
}

export async function getBookedDatesByCabinId(cabinId: number): Promise<Date[]> {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  const todayISOString = today.toISOString();

  const { data, error } = await supabase
    .from('bookings')
    .select('startDate, endDate') // hanya ambil kolom yang dibutuhkan
    .eq('cabinId', cabinId)
    .or(`startDate.gte.${todayISOString},status.eq.checked-in`);

  if (error) {
    console.error(error);
    throw new Error('Bookings could not get loaded');
  }

  const bookedDates = (data as BookingDateRange[])
    .map((booking) =>
      eachDayOfInterval({
        start: new Date(booking.startDate),
        end: new Date(booking.endDate),
      })
    )
    .flat();

  return bookedDates;
}

export async function getSettings() {
  const { data, error } = await supabase.from('settings').select('*').single();

  if (error) {
    console.error(error);
    throw new Error('Settings could not be loaded');
  }

  return data;
}

export async function getCountries() {
  try {
    const res = await fetch('https://restcountries.com/v2/all?fields=name,flag');
    const countries = await res.json();
    return countries;
  } catch {
    throw new Error('Could not fetch countries');
  }
}

/////////////
// CREATE

export async function createGuest(newGuest: Guest) {
  const { data, error } = await supabase.from('guests').insert<Guest>([newGuest]);

  if (error) {
    console.error(error);
    throw new Error('Guest could not be created');
  }

  return data;
}

export async function createBooking(newBooking: Booking) {
  const { data, error } = await supabase.from('bookings').insert([newBooking]).select().single();

  if (error) {
    console.error(error);
    throw new Error('Booking could not be created');
  }

  return data;
}

/////////////
// UPDATE

export async function updateGuest(id: number, updatedFields: Partial<Guest>) {
  const { data, error } = await supabase.from('guests').update(updatedFields).eq('id', id).select().single();

  if (error) {
    console.error(error);
    throw new Error('Guest could not be updated');
  }
  return data;
}

export async function updateBooking(id: number, updatedFields: Partial<Booking>) {
  const { data, error } = await supabase.from('bookings').update(updatedFields).eq('id', id).select().single();

  if (error) {
    console.error(error);
    throw new Error('Booking could not be updated');
  }
  return data;
}

/////////////
// DELETE

export async function deleteBooking(id: number) {
  const { data, error } = await supabase.from('bookings').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('Booking could not be deleted');
  }
  return data;
}
