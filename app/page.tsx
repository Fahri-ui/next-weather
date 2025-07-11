'use client'

import '@/app/ui/global.css';
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const [city, setCity] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (city.trim() !== '') {
      router.push(`/weather/${city.trim()}`)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-300 via-blue-400 to-indigo-500 relative overflow-hidden">
      {/* Animated Cloud Background */}
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
        {/* Header Section */}
        <div className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-white/90 backdrop-blur-sm rounded-full shadow-2xl mb-6 border-4 border-white/50">
            <span className="text-5xl">🌤️</span>
          </div>
          <h1 className="text-5xl font-bold text-white mb-4 tracking-tight drop-shadow-lg">
            Aplikasi Cuaca
          </h1>
          <p className="text-lg text-white/90 max-w-md mx-auto leading-relaxed drop-shadow-md">
            Dapatkan informasi cuaca terkini untuk kota favorit Anda dengan mudah dan cepat
          </p>
        </div>

        {/* Search Form */}
        <div className="w-full max-w-md">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Masukkan nama kota..."
                className="w-full px-6 py-4 text-lg border-2 border-white/30 rounded-xl 
                          focus:border-white/60 focus:outline-none focus:ring-4 focus:ring-white/20 
                          bg-white/90 backdrop-blur-sm shadow-2xl transition-all duration-300
                          placeholder:text-slate-500 text-slate-800"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            </div>
            
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-white/90 to-white/80 hover:from-white hover:to-white/90 
                        text-blue-600 font-semibold py-4 px-8 rounded-xl shadow-2xl 
                        transform hover:scale-105 transition-all duration-300 
                        focus:outline-none focus:ring-4 focus:ring-white/30
                        disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                        text-lg backdrop-blur-sm border-2 border-white/30"
              disabled={!city.trim()}
            >
              <span className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Lihat Cuaca
              </span>
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center">
          <p className="text-sm text-white/80 drop-shadow-sm">
            Didukung oleh data cuaca terpercaya untuk memberikan informasi akurat
          </p>
        </div>
      </main>
    </div>
  )
}