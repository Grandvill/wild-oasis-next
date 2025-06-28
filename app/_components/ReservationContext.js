'use client';

import { createContext, useContext, useState } from 'react';

const ReservationContext = createContext();

const initialState = { from: null, to: null };

function ReservationProvider({ children }) {
  const [range, setRange] = useState(initialState);
  const [reservationConfirmed, setReservationConfirmed] = useState(false);

  const resetRange = () => {
    setRange(initialState);
    setReservationConfirmed(false); // Reset konfirmasi saat range direset
  };

  return <ReservationContext.Provider value={{ range, setRange, resetRange, reservationConfirmed, setReservationConfirmed }}>{children}</ReservationContext.Provider>;
}

function useReservation() {
  const context = useContext(ReservationContext);
  if (context === undefined) {
    throw new Error('Context was used outside Provider');
  }
  return context;
}

export { ReservationProvider, useReservation };
