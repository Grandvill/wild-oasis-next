import Navigation from './_components/Navigation';
import Logo from './_components/Logo';

export const metadata = {
  title: 'The Wild Oasis',
  description: 'Welcome to The Wild Oasis',
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
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
