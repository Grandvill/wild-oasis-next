'use client';

import { useState } from 'react'; // Hanya useState, hapus useEffect
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function Navigation({ session }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <nav className="relative z-50">
      {/* Hamburger Button */}
      <button onClick={toggleMenu} className="sm:hidden text-white focus:outline-none" aria-label="Toggle navigation">
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Desktop Navigation */}
      <ul className="hidden sm:flex gap-10 text-xl items-center">
        <li>
          <Link href="/cabins" className="hover:text-accent-400 transition-colors">
            Cabins
          </Link>
        </li>
        <li>
          <Link href="/about" className="hover:text-accent-400 transition-colors">
            About
          </Link>
        </li>
        <li>
          {session?.user?.image ? (
            <Link href="/account" className="hover:text-accent-400 transition-colors flex items-center gap-2">
              <img className="h-8 rounded-full" src={session.user.image} alt={session.user.name} referrerPolicy="no-referrer" />
              <span>Guest area</span>
            </Link>
          ) : (
            <Link href="/account" className="hover:text-accent-400 transition-colors">
              Guest area
            </Link>
          )}
        </li>
      </ul>

      {/* Mobile Navigation */}
      {isOpen && (
        <ul className="absolute right-0 top-12 bg-primary-900 border border-primary-700 shadow-lg rounded-lg p-6 space-y-4 text-base w-48 sm:hidden">
          <li>
            <Link href="/cabins" onClick={() => setIsOpen(false)} className="block hover:text-accent-400">
              Cabins
            </Link>
          </li>
          <li>
            <Link href="/about" onClick={() => setIsOpen(false)} className="block hover:text-accent-400">
              About
            </Link>
          </li>
          <li>
            {session?.user?.image ? (
              <Link href="/account" onClick={() => setIsOpen(false)} className="block hover:text-accent-400 flex items-center gap-2">
                <img className="h-6 rounded-full" src={session.user.image} alt={session.user.name} referrerPolicy="no-referrer" />
                <span>Guest area</span>
              </Link>
            ) : (
              <Link href="/account" onClick={() => setIsOpen(false)} className="block hover:text-accent-400">
                Guest area
              </Link>
            )}
          </li>
        </ul>
      )}
    </nav>
  );
}
