'use client';

import Link from 'next/link';
import '@/app/ui/global.css';
import { useEffect, useState } from 'react';

interface WeatherInfo {
  city: string;
  icon: string;
}

export default function WeatherListPage() {
  const [weatherData, setWeatherData] = useState<Record<string, WeatherInfo>>({});
  const [loading, setLoading] = useState<boolean>(true);

  // ✅ state untuk modal form
  const [showForm, setShowForm] = useState(false);
  const [newCity, setNewCity] = useState('');

  const handleAddCity = async () => {
    if (!newCity.trim()) {
      alert('Nama kota wajib diisi!');
      return;
    }

    try {
      const res = await fetch('/api/weather', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ city: newCity }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || 'Gagal menambahkan kota');
        return;
      }

      // ✅ Update UI langsung tanpa reload
      setWeatherData((prev) => ({
        ...prev,
        [data.id]: {
          city: data.city,
          icon: data.icon,
        },
      }));

      // ✅ Reset & tutup modal
      setNewCity('');
      setShowForm(false);

    } catch (error) {
      console.error('Gagal menambah kota:', error);
      alert('Terjadi kesalahan koneksi');
    }
};

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/weather');
        const data = await res.json();
        setWeatherData(data);
      } catch (error) {
        console.error('Gagal memuat data cuaca:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-300 to-blue-500 pt-28 pb-12 px-6 text-white">
      <h1 className="text-4xl font-bold text-center mb-10 drop-shadow-lg">
        🌍 Pilih Cuaca Dari Kota Favorit Anda
      </h1>

      {loading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent"></div>
          <span className="ml-3 text-lg">Memuat data cuaca...</span>
        </div>
      ) : (
        <>
          {/* ✅ Grid kota + tombol tambah kota */}
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Object.entries(weatherData).map(([id, { city, icon }]) => (
              <Link
                key={id}
                href={`/weather/${id}`}
                className="bg-white/20 backdrop-blur-md rounded-xl p-6 text-center shadow-md hover:shadow-xl hover:bg-white/30 transition duration-300">
                <div className="text-4xl mb-2">{icon}</div>
                <div className="font-semibold text-white">{city}</div>
              </Link>
            ))}

            {/* ✅ Kotak Tambah Kota */}
            <button
              onClick={() => setShowForm(true)}
              className="flex flex-col items-center justify-center bg-white/10 backdrop-blur-md rounded-xl p-6 text-center shadow-md hover:shadow-xl hover:bg-white/20 transition duration-300">
              <div className="text-5xl font-bold text-white">+</div>
              <div className="font-semibold text-white mt-2">Tambah Kota</div>
            </button>
          </div>

          <p className="text-center text-sm text-white/80 mt-10">
            🔎 Klik salah satu kota untuk melihat detail cuacanya secara langsung
          </p>
        </>
      )}

      {/* ✅ Modal Form Tambah Kota */}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
          <div className="bg-white rounded-xl p-6 w-96 text-gray-800 shadow-lg">
            <h2 className="text-xl font-bold mb-4">Tambah Kota Baru</h2>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Nama Kota</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md"
                  placeholder="Contoh: Manado"
                  value={newCity}
                  onChange={(e) => setNewCity(e.target.value)}/>
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400"
                  onClick={() => setShowForm(false)}>
                  Batal
                </button>
                <button
                  type="button"
                  className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600"
                  onClick={handleAddCity}>
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
