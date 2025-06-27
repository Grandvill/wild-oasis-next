'use client';

import { useOptimistic } from 'react';
import ReservationCard from './ReservationCard';
import { deleteReservation } from '../_lib/actions';

function ReservationList({ bookings }) {
  // useOptimistic hook berfungsi untuk mengelola state optimis saat menghapus reservasi.
  // Ini memungkinkan kita untuk segera menghapus reservasi dari daftar tampilan tanpa menunggu respons
  const [optimisticBookings, optimisticDelete] = useOptimistic(bookings, (curBookings, bookingId) => {
    return curBookings.filter((booking) => booking.id !== bookingId);
  });

  async function handleDelete(bookingId) {
    await deleteReservation(bookingId);
  }

  return (
    <ul className="space-y-6">
      {optimisticBookings.map((booking) => (
        <ReservationCard booking={booking} onDelete={handleDelete} key={booking.id} />
      ))}
    </ul>
  );
}

export default ReservationList;
