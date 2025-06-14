'use client';

import { isWithinInterval } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { useReservation } from './ReservationContext';

function isAlreadyBooked(range, datesArr) {
  return range.from && range.to && datesArr.some((date) => isWithinInterval(date, { start: range.from, end: range.to }));
}

function DateSelector({ settings, cabin, bookedDates }) {
  const { range, setRange, resetRange } = useReservation();

  // CHANGE
  const regularPrice = 23;
  const discount = 0;
  const numNights = range.to ? Math.round((range.to - range.from) / (1000 * 60 * 60 * 24)) : 0;
  const cabinPrice = numNights * (regularPrice - discount);

  // SETTINGS
  const { minBookingLength, maxBookingLength } = settings;

  return (
    <div className="flex flex-col h-full border-r border-primary-800">
      {/* Calendar Container */}
      <div className="flex-1 flex items-center justify-center p-4 overflow-hidden">
        <div className="date-picker-container">
          <DayPicker
            mode="range"
            onSelect={setRange}
            selected={range}
            min={minBookingLength + 1}
            max={maxBookingLength}
            fromMonth={new Date()}
            fromDate={new Date()}
            toYear={new Date().getFullYear() + 5}
            captionLayout="dropdown"
            numberOfMonths={2}
            disabled={bookedDates}
            className="custom-day-picker"
          />
        </div>
      </div>

      {/* Price Summary */}
      <div className="flex items-center justify-between px-6 py-4 bg-accent-500 text-primary-800 border-t border-primary-800 min-h-[72px]">
        <div className="flex items-center gap-6 flex-wrap">
          <div className="flex gap-2 items-baseline">
            {discount > 0 ? (
              <>
                <span className="text-2xl font-semibold">${regularPrice - discount}</span>
                <span className="line-through font-semibold text-primary-700">${regularPrice}</span>
              </>
            ) : (
              <span className="text-2xl font-semibold">${regularPrice}</span>
            )}
            <span className="text-sm">/night</span>
          </div>

          {range.from && range.to && numNights > 0 && (
            <>
              <div className="bg-accent-600 px-3 py-1 rounded text-lg font-semibold">
                <span>×</span> <span>{numNights}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold uppercase text-primary-700">Total</span>
                <span className="text-xl font-bold">${cabinPrice}</span>
              </div>
            </>
          )}
        </div>

        {(range.from || range.to) && (
          <button className="border border-primary-800 py-2 px-4 text-sm font-semibold hover:bg-primary-100 transition-colors rounded" onClick={resetRange}>
            Clear
          </button>
        )}
      </div>
    </div>
  );
}

export default DateSelector;
