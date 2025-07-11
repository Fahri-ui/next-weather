'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils'; 

const menuItems = [
  { name: 'Home', href: '/' },
  { name: 'Weather', href: '/weather' },
  { name: 'Contact', href: '/contact' },
];

export default function Navigasi() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 bg-white/20 backdrop-blur-md border border-white/30 rounded-full shadow-lg px-6 py-2 flex gap-6 z-50">
      {menuItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            'text-white font-medium transition-all duration-300',
            pathname === item.href
              ? 'border-b-2 border-white pb-1'
              : 'hover:opacity-80'
          )}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
}
