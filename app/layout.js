import Navigation from '@/app/_components/Navigation';
import Logo from '@/app/_components/Logo';
import { Josefin_Sans } from 'next/font/google';
import '@/app/_styles/globals.css';

const josefin = Josefin_Sans({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  // title: 'The Wild Oasis',
  title: {
    template: '%s | The Wild Oasis',
    default: 'The Wild Oasis',
  },
  description: 'Luxurious cabin hotel, located in the middle of nature, surronded by beautiful mountains and dark forests. Book now and get the best deals.',
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body className={`${josefin.className} bg-primary-950 text-primary-100 min-h-screen`}>
        <header>
          <Logo />
          <Navigation />
        </header>
        <main>{children}</main>
        <footer>Copyright by The Wild Oasis</footer>
      </body>
    </html>
  );
}
