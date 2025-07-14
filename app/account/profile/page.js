import UpdateProfileForm from '@/app/_components/UpdateProfileForm';
import SelectCountry from '@/app/_components/SelectCountry';
import { auth } from '@/app/_lib/Auth';
import { getGuest } from '@/app/_lib/data-service';

export const metadata = {
  title: 'Update profile',
};

export default async function Page() {
  const session = await auth();
  const guest = await getGuest(session.user.email);

  // These are placeholder values, ensure they are correctly fetched or handled
  const countryFlag = guest?.countryFlag || 'default.jpg';
  const nationality = guest?.nationality || 'unknown';

  return (
    <div className="px-4 sm:px-6 md:px-0 py-4 sm:py-6">
      <h2 className="font-semibold text-xl sm:text-2xl text-accent-400 mb-4">Update your guest profile</h2>

      <p className="text-base sm:text-lg mb-6 sm:mb-8 text-primary-200">Providing the following information will make your check-in process faster and smoother. See you soon!</p>

      <UpdateProfileForm guest={guest}>
        <SelectCountry name="nationality" id="nationality" className="px-4 py-2 sm:px-5 sm:py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm" defaultCountry={guest.nationality} />
      </UpdateProfileForm>
    </div>
  );
}
