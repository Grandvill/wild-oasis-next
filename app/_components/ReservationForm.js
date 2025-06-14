'use client';

import { useReservation } from './ReservationContext';

function ReservationForm({ cabin }) {
  const { range } = useReservation();
  const { maxCapacity } = cabin;

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-primary-800 text-primary-300 px-6 py-3 flex justify-between items-center border-b border-primary-700">
        <p className="font-medium">Logged in as</p>
        {/* Uncomment when user data is available */}
        {/* <div className='flex gap-4 items-center'>
          <img
            referrerPolicy='no-referrer'
            className='h-8 rounded-full'
            src={user.image || "/placeholder.svg"}
            alt={user.name}
          />
          <p>{user.name}</p>
        </div> */}
      </div>

      {/* Selected Dates Display */}
      {(range.from || range.to) && (
        <div className="px-6 py-3 bg-primary-100 border-b border-primary-200">
          <p className="text-sm text-primary-700">
            <span className="font-medium">Selected dates: </span>
            {range.from && range.to ? `${range.from.toLocaleDateString()} to ${range.to.toLocaleDateString()}` : range.from ? `From ${range.from.toLocaleDateString()}` : 'Select dates'}
          </p>
        </div>
      )}

      {/* Form */}
      <form className="bg-primary-900 flex-1 py-8 px-6 text-lg flex gap-6 flex-col">
        <div className="space-y-2">
          <label htmlFor="numGuests" className="block text-primary-200 font-medium">
            How many guests?
          </label>
          <select
            name="numGuests"
            id="numGuests"
            className="px-4 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded border border-primary-300 focus:border-accent-500 focus:ring-1 focus:ring-accent-500 focus:outline-none"
            required
          >
            <option value="" key="">
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
          <label htmlFor="observations" className="block text-primary-200 font-medium">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            id="observations"
            rows={4}
            className="px-4 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded border border-primary-300 focus:border-accent-500 focus:ring-1 focus:ring-accent-500 focus:outline-none resize-none"
            placeholder="Any pets, allergies, special requirements, etc.?"
          />
        </div>

        <div className="flex justify-end items-center gap-6 mt-auto pt-4">
          {!range.from || !range.to ? <p className="text-primary-400 text-base">Start by selecting dates</p> : null}

          <button
            className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300 rounded shadow-md"
            disabled={!range.from || !range.to}
          >
            Reserve now
          </button>
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;
