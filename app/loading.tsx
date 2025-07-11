'use client';
import { useEffect, useState } from 'react';
import '@/app/ui/global.css';

export default function Loading() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDone(true); // Setelah 5 detik, matikan loading
    }, 5000);
    return () => clearTimeout(timeout);
  }, []);

  if (done) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-blue-600 text-3xl font-bold">
        Konten Siap Dimuat ✅
      </div>
    );
  }

  // Sementara loading berlangsung
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-300 via-blue-400 to-indigo-500 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-32 h-16 bg-white rounded-full blur-sm animate-pulse"></div>
        <div className="absolute top-20 right-20 w-24 h-12 bg-white rounded-full blur-sm animate-pulse delay-1000"></div>
        <div className="absolute top-40 left-1/4 w-40 h-20 bg-white rounded-full blur-sm animate-pulse delay-2000"></div>
        <div className="absolute bottom-32 right-1/3 w-28 h-14 bg-white rounded-full blur-sm animate-pulse delay-500"></div>
        <div className="absolute bottom-20 left-1/2 w-36 h-18 bg-white rounded-full blur-sm animate-pulse delay-1500"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full animate-bounce"></div>
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-white rounded-full animate-bounce delay-300"></div>
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-white rounded-full animate-bounce delay-700"></div>
        <div className="absolute bottom-1/3 right-1/3 w-1 h-1 bg-white rounded-full animate-bounce delay-1000"></div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 via-transparent to-sky-200/30"></div>

      <main className="relative z-10 min-h-screen flex flex-col items-center justify-center p-8">
        <div className="text-center space-y-8">
          {/* Animated Weather Icon */}
          <div className="relative">
            <div className="inline-flex items-center justify-center w-32 h-32 bg-white/90 backdrop-blur-sm rounded-full shadow-2xl border-4 border-white/50 animate-pulse">
              <span className="text-6xl animate-bounce">🌤️</span>
            </div>
            <div className="absolute inset-0 border-4 border-transparent border-t-white/60 rounded-full animate-spin"></div>
            <div className="absolute inset-2 border-2 border-transparent border-t-white/40 rounded-full animate-spin animation-reverse"></div>
          </div>

          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-white drop-shadow-lg">Memuat Data Cuaca</h2>
            <p className="text-white/80 text-lg drop-shadow-md">Mohon tunggu sebentar...</p>
          </div>

          <div className="flex justify-center space-x-2">
            <div className="w-3 h-3 bg-white rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-white rounded-full animate-bounce delay-150"></div>
            <div className="w-3 h-3 bg-white rounded-full animate-bounce delay-300"></div>
          </div>

          <div className="w-64 mx-auto">
            <div className="bg-white/30 rounded-full h-2 overflow-hidden">
              <div className="bg-gradient-to-r from-white/60 to-white/80 h-full rounded-full animate-pulse"></div>
            </div>
          </div>

          <div className="flex justify-center space-x-8 mt-12">
            <div className="text-4xl animate-bounce delay-100">☀️</div>
            <div className="text-4xl animate-bounce delay-200">⛅</div>
            <div className="text-4xl animate-bounce delay-300">🌧️</div>
            <div className="text-4xl animate-bounce delay-400">❄️</div>
          </div>
        </div>

        {/* Floating Cards */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-20 w-24 h-16 bg-white/20 backdrop-blur-sm rounded-lg animate-pulse delay-1000"></div>
          <div className="absolute top-40 right-32 w-20 h-12 bg-white/20 backdrop-blur-sm rounded-lg animate-pulse delay-1500"></div>
          <div className="absolute bottom-32 left-32 w-28 h-18 bg-white/20 backdrop-blur-sm rounded-lg animate-pulse delay-2000"></div>
          <div className="absolute bottom-20 right-20 w-32 h-20 bg-white/20 backdrop-blur-sm rounded-lg animate-pulse delay-500"></div>
        </div>
      </main>
    </div>
  );
}
