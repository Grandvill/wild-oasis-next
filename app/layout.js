import Navigation from './components/Navigation';

export const metadata = {
  title: 'The Wild Oasis',
  description: 'Welcome to The Wild Oasis',
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Navigation />
        <main>{children}</main>
        <footer>Copyright by The Wild Oasis</footer>
      </body>
    </html>
  );
}
