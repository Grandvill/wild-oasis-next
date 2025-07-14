import Image from 'next/image';
import { format, isPast } from 'date-fns';
import Link from 'next/link';
import { PencilSquareIcon } from '@heroicons/react/24/solid';
import DeleteReservation from './DeleteReservation';

function ReservationCard({ booking, onDelete }) {
  const {
    id,
    guestId,
    startDate,
    endDate,
    numNights,
    totalPrice,
    numGuests,
    status,
    created_at,
    cabins: { name, image },
  } = booking;

  const displayRange = `${format(new Date(startDate), 'MMM dd yyyy')} &mdash; ${format(new Date(endDate), 'MMM dd yyyy')}`;

  return (
    <div className="flex flex-col sm:flex-row border border-primary-800 rounded-lg overflow-hidden">
      {/* Image Section */}
      <div className="relative w-full h-48 sm:w-48 sm:h-auto flex-shrink-0">
        <Image src={image || '/placeholder.svg'} alt={`Cabin ${name}`} fill className="object-cover border-b sm:border-b-0 sm:border-r border-primary-800" sizes="(max-width: 640px) 100vw, 192px" />
      </div>

      {/* Details Section */}
      <div className="flex-grow p-4 sm:p-6 flex flex-col gap-3 sm:gap-4">
        <h2 className="text-xl sm:text-2xl text-accent-400 font-semibold">{name}</h2>
        <p className="text-primary-200 text-sm sm:text-base">
          <span className="font-bold">
            {numGuests} {numGuests === 1 ? 'guest' : 'guests'}
          </span>{' '}
          &bull; {numNights} nights in cabin
        </p>
        <p className="text-primary-200 text-sm sm:text-base">
          Stay dates: <span className="font-bold">{displayRange}</span>
        </p>
        <p className="text-primary-200 text-sm sm:text-base">
          Total price: <span className="font-bold">${totalPrice}</span>
        </p>
        <p className="text-primary-200 text-sm sm:text-base">
          Booked <span className="font-bold">{format(new Date(created_at), 'MMM dd yyyy')}</span>
        </p>
      </div>

      {/* Actions Section */}
      <div className="flex flex-row sm:flex-col w-full sm:w-[100px] border-t sm:border-t-0 sm:border-l border-primary-800">
        <DeleteReservation bookingId={id} onDelete={onDelete} />

        {isPast(new Date(startDate)) ? (
          <span className="text-center text-primary-200 text-sm sm:text-base px-2 py-3 sm:py-5">Past reservation</span>
        ) : (
          <Link
            href={`/account/reservations/edit/${id}`}
            className="group flex items-center gap-2 sm:gap-3 px-2 py-3 sm:py-5 text-sm sm:text-base uppercase font-semibold text-primary-200 flex-grow justify-center hover:bg-accent-600 hover:text-primary-800 transition-colors"
          >
            <PencilSquareIcon className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
            <span className="hidden sm:block">Edit</span>
            <span className="block sm:hidden">Edit</span>
          </Link>
        )}
      </div>
    </div>
  );
}

export default ReservationCard;
