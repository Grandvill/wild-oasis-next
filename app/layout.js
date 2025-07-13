import Header from '@/app/_components/Header';
import { Josefin_Sans } from 'next/font/google';
import '@/app/_styles/globals.css';
import { ReservationProvider } from './_components/ReservationContext';
import ReservationReminder from './_components/ReservationReminder';

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

export default function RootLayout({ children }) {
  return (
    <html>
      <body className={`${josefin.className} antialiased bg-primary-950 text-primary-100 min-h-screen relative`}>
        <Header />
        <ReservationProvider>
          {children}
          <ReservationReminder />
        </ReservationProvider>
      </body>
    </html>
  );
}
