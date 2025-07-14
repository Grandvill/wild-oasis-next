import { auth } from '../_lib/Auth';

export const metadata = {
  title: 'Account',
};

export default async function Page() {
  const session = await auth();
  const firstName = session.user.name.split(' ').at(0);

  return (
    <div className="px-4 sm:px-6 md:px-0 py-4 sm:py-6">
      <h2 className="font-semibold text-xl sm:text-2xl text-accent-400 mb-4 sm:mb-7">Welcome, {firstName}</h2>
      <p className="text-base sm:text-lg text-primary-200">This is your personal account dashboard. Here you can manage your reservations and update your profile.</p>
    </div>
  );
}
