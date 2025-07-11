'use client';

import Link from 'next/link';
import '@/app/ui/global.css';

const contacts = [
  {
    platform: 'WhatsApp',
    href: 'https://wa.me/0895320338692',
    icon: '💬',
    desc: 'Hubungi nomor saya',
  },
  {
    platform: 'Instagram',
    href: 'https://www.instagram.com/fhr7651?igsh=YzljYTk1ODg3Zg==',
    icon: '📸',
    desc: 'Ikuti instagram saya',
  },
  {
    platform: 'TikTok',
    href: 'https://www.tiktok.com/@risol_main?_t=ZS-8xugCvbrM4w&_r=1',
    icon: '🎵',
    desc: 'Saya juga aktif di tiktok',
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-300 to-blue-500 pt-28 pb-12 px-6 text-white">
      <h1 className="text-4xl font-bold text-center mb-10 drop-shadow-lg">
        📱 Hubungi Saya
      </h1>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {contacts.map(({ platform, href, icon, desc }) => (
          <Link
            key={platform}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/20 backdrop-blur-md rounded-2xl p-6 shadow-md hover:shadow-xl hover:bg-white/30 transition duration-300 text-center"
          >
            <div className="text-5xl mb-4">{icon}</div>
            <h2 className="text-xl font-semibold mb-2">{platform}</h2>
            <p className="text-white/80 text-sm">{desc}</p>
          </Link>
        ))}
      </div>

      <p className="text-center text-sm text-white/70 mt-12">
        Saya aktif di platform sosial media. Jangan ragu untuk menyapa Saya! 👋
      </p>
    </div>
  );
}
