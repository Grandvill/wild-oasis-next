'use client';

import { CalendarDaysIcon, HomeIcon, UserIcon } from '@heroicons/react/24/solid';
import SignOutButton from './SignOutButton';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  {
    name: 'Home',
    href: '/account',
    icon: <HomeIcon className="h-5 w-5 text-primary-600" />,
  },
  {
    name: 'Reservations',
    href: '/account/reservations',
    icon: <CalendarDaysIcon className="h-5 w-5 text-primary-600" />,
  },
  {
    name: 'Guest profile',
    href: '/account/profile',
    icon: <UserIcon className="h-5 w-5 text-primary-600" />,
  },
];

function SideNavigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      {/* Hamburger Button for Mobile */}
      <button onClick={toggleMenu} className="md:hidden fixed top-6 right-6 z-50 text-white focus:outline-none">
        {isOpen ? <X size={32} /> : <Menu size={32} />}
      </button>

      {/* Desktop Side Navigation */}
      <nav className="hidden md:block border-r border-primary-900">
        <ul className="flex flex-col gap-2 h-full text-lg">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                className={`py-3 px-5 hover:bg-primary-900 hover:text-primary-100 transition-colors flex items-center gap-4 font-semibold text-primary-200 ${pathname === link.href ? 'bg-primary-900 text-primary-100' : ''}`}
                href={link.href}
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            </li>
          ))}
          <li className="mt-auto">
            <SignOutButton />
          </li>
        </ul>
      </nav>

      {/* Mobile Overlay Navigation */}
      {isOpen && (
        <div className="fixed inset-0 bg-primary-950 z-40 flex flex-col items-center justify-center">
          <ul className="flex flex-col gap-6 text-2xl text-center">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link className={`hover:text-accent-400 transition-colors ${pathname === link.href ? 'text-accent-400' : 'text-primary-100'}`} href={link.href} onClick={() => setIsOpen(false)}>
                  {link.name}
                </Link>
              </li>
            ))}
            <li>
              <SignOutButton onClick={() => setIsOpen(false)} />
            </li>
          </ul>
        </div>
      )}
    </>
  );
}

export default SideNavigation;
