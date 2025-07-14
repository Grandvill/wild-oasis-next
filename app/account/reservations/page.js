import Link from 'next/link';
import { getBookings } from '../../_lib/data-service';
import { auth } from '../../_lib/Auth';
import ReservationList from '../../_components/ReservationList';

export const metadata = {
  title: 'Reservations',
};

export default async function Page() {
  const session = await auth();
  const bookings = await getBookings(session.user.guestId);

  return (
    <div className="px-4 sm:px-6 md:px-0 py-4 sm:py-6">
      <h2 className="font-semibold text-xl sm:text-2xl text-accent-400 mb-4 sm:mb-7">Your reservations</h2>

      {bookings.length === 0 ? (
        <p className="text-base sm:text-lg text-primary-200">
          You have no reservations yet. Check out our{' '}
          <Link className="underline text-accent-500 hover:text-accent-400 transition-colors" href="/cabins">
            luxury cabins &rarr;
          </Link>
        </p>
      ) : (
        <ReservationList bookings={bookings} />
      )}
    </div>
  );
}
