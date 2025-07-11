import { notFound } from 'next/navigation'
import Link from 'next/link'
import '@/app/ui/global.css'

type WeatherProps = {
  params: {
    city: string
  }
}

export default async function WeatherPage({ params }: WeatherProps) {
  await new Promise((res) => setTimeout(res, 1000)); // ⏳ tahan 5 detik
  const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY
  const city = params.city

  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
  )

  // Jika error (misal kota tidak ditemukan)
  if (!res.ok) {
    notFound()
  }

  const data = await res.json()

  // Function to get weather icon based on condition
  const getWeatherIcon = (condition: string) => {
    const icons: { [key: string]: string } = {
      'clear sky': '☀️',
      'few clouds': '⛅',
      'scattered clouds': '☁️',
      'broken clouds': '☁️',
      'overcast clouds': '☁️',
      'shower rain': '🌦️',
      'rain': '🌧️',
      'thunderstorm': '⛈️',
      'snow': '❄️',
      'mist': '🌫️',
      'fog': '🌫️',
      'haze': '🌫️'
    }
    return icons[condition.toLowerCase()] || '🌤️'
  }

  // Function to get temperature color
  const getTempColor = (temp: number) => {
    if (temp >= 30) return 'text-red-500'
    if (temp >= 20) return 'text-orange-500'
    if (temp >= 10) return 'text-yellow-500'
    return 'text-blue-500'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-300 via-blue-400 to-indigo-500 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-32 h-16 bg-white rounded-full blur-sm animate-pulse"></div>
        <div className="absolute top-20 right-20 w-24 h-12 bg-white rounded-full blur-sm animate-pulse delay-1000"></div>
        <div className="absolute top-40 left-1/4 w-40 h-20 bg-white rounded-full blur-sm animate-pulse delay-2000"></div>
        <div className="absolute bottom-32 right-1/3 w-28 h-14 bg-white rounded-full blur-sm animate-pulse delay-500"></div>
      </div>

      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full animate-bounce"></div>
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-white rounded-full animate-bounce delay-300"></div>
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-white rounded-full animate-bounce delay-700"></div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 via-transparent to-sky-200/30"></div>

      <main className="relative z-10 min-h-screen p-8">
        <div className="mb-8">
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
              {data.name}
            </h1>
            <p className="text-white/80 text-lg drop-shadow-md">
              
            </p>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 mb-8 border-2 border-white/30">
            <div className="text-center mb-8">
              <div className="text-8xl mb-4">
                {getWeatherIcon(data.weather[0].description)}
              </div>
              <div className={`text-6xl font-bold mb-2 ${getTempColor(data.main.temp)}`}>
                {Math.round(data.main.temp)}°C
              </div>
              <p className="text-2xl text-gray-600 capitalize mb-2">
                {data.weather[0].description}
              </p>
              <p className="text-gray-500">
                Terasa seperti {Math.round(data.main.feels_like)}°C
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 text-center">
                <div className="text-3xl mb-2">💧</div>
                <div className="text-2xl font-bold text-blue-600 mb-1">
                  {data.main.humidity}%
                </div>
                <div className="text-sm text-gray-600">Kelembaban</div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 text-center">
                <div className="text-3xl mb-2">🌬️</div>
                <div className="text-2xl font-bold text-green-600 mb-1">
                  {data.wind.speed} m/s
                </div>
                <div className="text-sm text-gray-600">Kecepatan Angin</div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 text-center">
                <div className="text-3xl mb-2">🌡️</div>
                <div className="text-2xl font-bold text-purple-600 mb-1">
                  {data.main.pressure} hPa
                </div>
                <div className="text-sm text-gray-600">Tekanan Udara</div>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 text-center">
                <div className="text-3xl mb-2">👁️</div>
                <div className="text-2xl font-bold text-orange-600 mb-1">
                  {data.visibility ? (data.visibility / 1000).toFixed(1) : 'N/A'} km
                </div>
                <div className="text-sm text-gray-600">Jarak Pandang</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border-2 border-white/30">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">🌡️</span>
                Rentang Suhu
              </h3>
              <div className="flex justify-between items-center">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {Math.round(data.main.temp_min)}°C
                  </div>
                  <div className="text-sm text-gray-600">Minimum</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">
                    {Math.round(data.main.temp_max)}°C
                  </div>
                  <div className="text-sm text-gray-600">Maksimum</div>
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border-2 border-white/30">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">☀️</span>
                Matahari
              </h3>
              <div className="flex justify-between items-center">
                <div className="text-center">
                  <div className="text-lg font-bold text-orange-600">
                    {new Date(data.sys.sunrise * 1000).toLocaleTimeString('id-ID', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </div>
                  <div className="text-sm text-gray-600">Terbit</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-orange-600">
                    {new Date(data.sys.sunset * 1000).toLocaleTimeString('id-ID', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </div>
                  <div className="text-sm text-gray-600">Terbenam</div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-white/80 text-sm drop-shadow-sm">
              Terakhir diperbarui: {new Date().toLocaleString('id-ID')}
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}