import { getBookedDatesByCabinId, getSettings } from "../_lib/data-service";
import DateSelector from "./DateSelector";
import ReservationForm from "./ReservationForm";

async function Reservations({ cabin }) {
  // STILL BAD: This will make take the longest request and make the other two wait for it to finish
  const [settings, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabin.id),
  ]);

  return (
    <div className="grid grid-cols-1 min-h-[800px] border border-primary-800">
      <DateSelector cabin={cabin} settings={settings} />
      <ReservationForm />
    </div>
  );
}

export default Reservations;
