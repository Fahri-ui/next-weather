'use client';

import Link from 'next/link';
import '@/app/ui/global.css';

const weatherData = {
  jakarta: { city: 'Jakarta', icon: '☀️' },
  bandung: { city: 'Bandung', icon: '⛅' },
  surabaya: { city: 'Surabaya', icon: '🌤️' },
  medan: { city: 'Medan', icon: '🌦️' },
  makassar: { city: 'Makassar', icon: '🌞' },
  yogyakarta: { city: 'Yogyakarta', icon: '🌥️' },
  bali: { city: 'Bali', icon: '🌈' },
  palembang: { city: 'Palembang', icon: '🌡️' },
  semarang: { city: 'Semarang', icon: '🌤️' },
  padang: { city: 'Padang', icon: '☁️' },
  pontianak: { city: 'Pontianak', icon: '🌩️' },
  manado: { city: 'Manado', icon: '🌬️' },
};

export default function WeatherListPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-300 to-blue-500 pt-28 pb-12 px-6 text-white">
      <h1 className="text-4xl font-bold text-center mb-10 drop-shadow-lg">
        🌍 Info Cuaca 10 Kota Besar
      </h1>

      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Object.entries(weatherData).map(([id, { city, icon }]) => (
          <Link
            key={id}
            href={`/weather/${id}`}
            className="bg-white/20 backdrop-blur-md rounded-xl p-6 text-center shadow-md hover:shadow-xl hover:bg-white/30 transition duration-300"
          >
            <div className="text-4xl mb-2">{icon}</div>
            <div className="font-semibold text-white">{city}</div>
          </Link>
        ))}
      </div>

      <p className="text-center text-sm text-white/80 mt-10">
        🔎 Klik salah satu kota untuk melihat detail cuacanya secara langsung
      </p>
    </div>
  );
}
