'use client';

import { isWithinInterval, differenceInDays } from 'date-fns';
import { useState, useEffect } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

function isAlreadyBooked(range, datesArr) {
  return range.from && range.to && datesArr.some((date) => isWithinInterval(date, { start: range.from, end: range.to }));
}

function DateSelector({ settings, bookedDates, cabin }) {
  const [range, setRange] = useState({ from: undefined, to: undefined });

  // These would normally come from props or calculations
  const regularPrice = cabin?.regularPrice || 250;
  const discount = cabin?.discount || 0;

  // Calculate nights and price based on selected range
  const [numNights, setNumNights] = useState(0);
  const [cabinPrice, setCabinPrice] = useState(0);

  // Update nights and price when range changes
  useEffect(() => {
    if (range.from && range.to) {
      const nights = differenceInDays(range.to, range.from);
      setNumNights(nights);
      setCabinPrice(nights * (regularPrice - discount));
    } else {
      setNumNights(0);
      setCabinPrice(0);
    }
  }, [range, regularPrice, discount]);

  // SETTINGS
  const { minBookingLength = 1, maxBookingLength = 30 } = settings || {};

  // Function to reset the date range
  const resetRange = () => {
    setRange({ from: undefined, to: undefined });
  };

  // Convert booked dates from strings to Date objects if needed
  const disabledDates = bookedDates?.map((date) => (typeof date === 'string' ? new Date(date) : date)) || [];

  // Custom navigation buttons
  const CustomNavigation = ({ onPreviousClick, onNextClick }) => {
    return (
      <div className="flex justify-center space-x-4 text-[#d4a762]">
        <button onClick={onPreviousClick} className="text-xl hover:text-[#c69c58]">
          ←
        </button>
        <button onClick={onNextClick} className="text-xl hover:text-[#c69c58]">
          →
        </button>
      </div>
    );
  };

  return (
    <div className="flex flex-col justify-between bg-[#1a1f25] text-white w-full ">
      <div className="p-6 ">
        {/* Custom styling for react-day-picker */}
        <style jsx global>{`
          .rdp {
            --rdp-cell-size: 40px;
            --rdp-accent-color: #d4a762;
            --rdp-background-color: #2c3440;
            margin: 0;
          }
          .rdp-months {
            display: flex;
            justify-content: space-between;
          }
          .rdp-month {
            background-color: transparent;
            margin: 0;
          }
          .rdp-caption {
            display: none; /* Hide default caption since we're creating our own */
          }
          .rdp-cell {
            padding: 0;
          }
          .rdp-head_cell {
            font-weight: 400;
            color: #9ca3af;
            font-size: 0.8rem;
            text-transform: uppercase;
          }
          .rdp-day {
            width: 40px;
            height: 40px;
            border-radius: 0;
            transition: all 0.2s ease;
          }
          .rdp-day:hover:not(.rdp-day_disabled):not(.rdp-day_selected) {
            background-color: #2c3440;
          }
          .rdp-day_selected {
            background-color: #d4a762;
            color: #1a1f25;
            font-weight: bold;
          }
          .rdp-day_selected:hover {
            background-color: #c69c58;
          }
          .rdp-day_range_middle {
            background-color: #8b6d3f;
            color: white;
          }
        `}</style>

        <DayPicker
          mode="range"
          onSelect={(range) => setRange(range || { from: undefined, to: undefined })}
          selected={range}
          disabled={disabledDates}
          fromMonth={new Date()}
          fromDate={new Date()}
          toYear={new Date().getFullYear() + 5}
          numberOfMonths={2}
          modifiers={{
            booked: disabledDates,
          }}
          modifiersStyles={{
            booked: {
              backgroundColor: '#2c3440',
              color: '#6c7a89',
              textDecoration: 'line-through',
            },
          }}
          showOutsideDays={false}
          captionLayout="buttons"
          hideHead={false}
        />
      </div>

      <div className="bg-[#d4a762] text-[#1a1f25] p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="font-bold text-xl">
              ${regularPrice} <span className="text-sm font-normal">/night</span>
            </div>
          </div>

          {(range.from || range.to) && (
            <button className="border border-[#1a1f25] py-1 px-6 text-sm font-medium hover:bg-[#c69c58] transition-colors" onClick={resetRange}>
              Clear
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default DateSelector;
