import DateSelector from './DateSelector';
import ReservationForm from './ReservationForm';
import { getSettings, getBookedDatesByCabinId } from '../_lib/data-service';

async function Reservation({ cabin }) {
  const [settings, bookedDates] = await Promise.all([getSettings(), getBookedDatesByCabinId(cabin.id)]);
  return (
    <div className="flex flex-row justify-between items-start border border-primary-800 min-h-[400px] w-full max-w-6xl mx-auto">
      <DateSelector settings={settings} bookedDates={bookedDates} cabin={cabin} />
      <ReservationForm cabin={cabin} />
    </div>
  );
}

export default Reservation;
