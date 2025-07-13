'use client';

import Link from 'next/link';

export default function Navigation({ mobile = false, onItemClick }) {
  // Remove the async and auth logic for now since it conflicts with client component
  const session = null; // We'll handle auth differently

  const linkClass = mobile ? 'block py-3 px-2 text-lg text-white hover:text-accent-400 transition-colors border-b border-white/10 last:border-b-0' : 'hover:text-accent-400 transition-colors text-lg';

  const containerClass = mobile ? 'flex flex-col space-y-0' : 'flex gap-8 lg:gap-16 items-center';

  return (
    <nav className="text-white">
      <ul className={containerClass}>
        <li>
          <Link href="/cabins" className={linkClass} onClick={onItemClick}>
            Cabins
          </Link>
        </li>
        <li>
          <Link href="/about" className={linkClass} onClick={onItemClick}>
            About
          </Link>
        </li>
        <li>
          <Link href="/account" className={linkClass} onClick={onItemClick}>
            Guest area
          </Link>
        </li>
      </ul>
    </nav>
  );
}
