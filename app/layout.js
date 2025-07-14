import Header from '@/app/_components/Header';
import { Josefin_Sans } from 'next/font/google';
import '@/app/_styles/globals.css';
import { ReservationProvider } from './_components/ReservationContext';
import ReservationReminder from './_components/ReservationReminder';
import { supabase } from './_lib/supabase';

const josefin = Josefin_Sans({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: {
    template: '%s | The Wild Oasis',
    default: 'The Wild Oasis',
  },
  description: 'Luxurious cabin hotel, located in the middle of nature, surrounded by beautiful mountains and dark forests. Book now and get the best deals.',
};

export default async function RootLayout({ children }) {
  // Ambil sesi di sisi server
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <html>
      <body className={`${josefin.className} antialiased bg-primary-950 text-primary-100 min-h-screen flex flex-col relative`}>
        <Header session={session} /> {/* Teruskan sesi ke Header */}
        <div className="flex-1 px-8 py-12 grid">
          <main className="max-w-7xl mx-auto w-full">
            <ReservationProvider>
              {children}
              <ReservationReminder />
            </ReservationProvider>
          </main>
        </div>
      </body>
    </html>
  );
}
