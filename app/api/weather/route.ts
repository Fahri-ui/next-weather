// app/api/weather/route.ts
import { NextResponse } from 'next/server'

// Fungsi untuk memilih ikon berdasarkan kondisi cuaca
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

// Dummy kondisi cuaca untuk tiap kota
const rawWeatherData = [
  { id: 'jakarta', city: 'Jakarta', condition: 'clear sky' },
  { id: 'bandung', city: 'Bandung', condition: 'few clouds' },
  { id: 'surabaya', city: 'Surabaya', condition: 'rain' }
]

// Proses supaya tiap kota punya icon otomatis
const weatherData: Record<string, { city: string; condition: string; icon: string }> = {}

rawWeatherData.forEach(({ id, city, condition }) => {
  weatherData[id] = {
    city,
    condition,
    icon: getWeatherIcon(condition)
  }
})
export async function GET() {
  return new Response(JSON.stringify(weatherData), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}


export async function POST(req: Request) {
  try {
    const { city } = await req.json();

    if (!city) {
      return NextResponse.json(
        { error: 'Nama kota wajib diisi' },
        { status: 400 }
      );
    }

    // ✅ Buat ID unik dari nama kota (lowercase, tanpa spasi)
    const id = city.toLowerCase().replace(/\s+/g, '');

    // ✅ Jika sudah ada, tolak
    if (weatherData[id]) {
      return NextResponse.json(
        { error: 'Kota ini sudah ada dalam daftar' },
        { status: 409 }
      );
    }

    // ✅ Ambil data cuaca dari OpenWeather
    const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
        city
      )}&appid=${apiKey}&units=metric`
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: 'Gagal mengambil data dari OpenWeather' },
        { status: 500 }
      );
    }

    const weatherJson = await res.json();
    const condition = weatherJson.weather?.[0]?.description || 'clear sky';

    // ✅ Tentukan ikon otomatis
    const icon = getWeatherIcon(condition);

    // ✅ Simpan ke memory
    weatherData[id] = {
      city,
      condition,
      icon,
    };

    return NextResponse.json(
      {
        id,
        city,
        condition,
        icon,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('POST /api/weather error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    );
  }
}
// ✅ Untuk tahap CRUD berikutnya kita bisa tambahkan PATCH, DELETE