'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-sky-300 to-blue-500 text-white px-6">
      <div className="bg-white/20 backdrop-blur-md rounded-2xl p-8 shadow-lg text-center max-w-md w-full">
        <div className="text-6xl mb-4">☁️❓</div>
        <h1 className="text-4xl font-bold mb-2">Oops! Halaman Tidak Ditemukan</h1>
        <p className="text-white/90 mb-6">
          Kami tidak dapat menemukan halaman atau kota yang kamu cari.
        </p>
        <Link
          href="/"
          className="inline-block bg-white/20 hover:bg-white/30 backdrop-blur-md text-white font-medium py-2 px-5 rounded-full transition duration-300"
        >
          🔙 Kembali ke Beranda
        </Link>
      </div>
      <p className="text-sm text-white/60 mt-6">
        Mungkin awan menutupinya untuk sementara waktu ☁️
      </p>
    </div>
  );
}
