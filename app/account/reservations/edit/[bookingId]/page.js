import { updateReservation } from '@/app/_lib/actions';
import { getBooking, getCabin } from '@/app/_lib/data-service';
import SubmitButton from '@/app/_components/SubmitButton';
import Link from 'next/link'; // Import Link for the back button

export default async function Page({ params }) {
  const { bookingId } = params;
  const { numGuests, observations, cabinId } = await getBooking(bookingId);
  const { maxCapacity } = await getCabin(cabinId);

  // gunakan defaultValue untuk mengisi nilai awal pada form dari database, ini akan mengisi nilai ketika form pertama kali dimuat
  return (
    <div className="px-4 sm:px-6 md:px-0 py-4 sm:py-6">
      <h2 className="font-semibold text-xl sm:text-2xl text-accent-400 mb-4 sm:mb-7">Edit Reservation #{bookingId}</h2>

      <form action={updateReservation} className="bg-primary-900 py-6 px-6 sm:py-8 sm:px-12 text-base sm:text-lg flex gap-4 sm:gap-6 flex-col rounded-lg">
        <input type="hidden" name="bookingId" value={bookingId} />
        <div className="space-y-2">
          <label htmlFor="numGuests" className="block text-primary-200">
            How many guests?
          </label>
          <select name="numGuests" id="numGuests" defaultValue={numGuests} className="px-4 py-2 sm:px-5 sm:py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm focus:outline-none focus:ring-2 focus:ring-accent-500" required>
            <option value="" disabled>
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? 'guest' : 'guests'}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations" className="block text-primary-200">
            Anything we should know about your stay?
          </label>
          <textarea name="observations" defaultValue={observations} className="px-4 py-2 sm:px-5 sm:py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm min-h-[8rem] focus:outline-none focus:ring-2 focus:ring-accent-500" />
        </div>

        <div className="flex flex-col sm:flex-row justify-end items-center gap-4 sm:gap-6 mt-4">
          <Link
            href="/account/reservations"
            className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-primary-200 bg-primary-800 hover:bg-primary-700 rounded-lg transition-colors duration-200 w-full sm:w-auto"
          >
            Cancel
          </Link>
          <SubmitButton pendingLabel="Updating..." className="w-full sm:w-auto">
            Update reservation
          </SubmitButton>
        </div>
      </form>
    </div>
  );
}
