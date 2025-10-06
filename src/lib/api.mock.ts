// Mock API implementations for development
import { Hotel, WeatherData, LocalEvent, HotelSearchParams } from './api';

// Simulate network delay
const delay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));

export const mockApi = {
  searchHotels: async (params: HotelSearchParams): Promise<Hotel[]> => {
    await delay();
    
    return [
      {
        id: '1',
        name: `Hotel ${params.location} Premium`,
        rating: 4.5,
        pricePerNight: 750000,
        imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400',
        amenities: ['WiFi', 'Pool', 'Restaurant', 'Spa'],
      },
      {
        id: '2',
        name: `${params.location} Resort & Spa`,
        rating: 4.8,
        pricePerNight: 1200000,
        imageUrl: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=400',
        amenities: ['WiFi', 'Pool', 'Beach Access', 'Gym'],
      },
      {
        id: '3',
        name: `Budget Inn ${params.location}`,
        rating: 4.0,
        pricePerNight: 350000,
        imageUrl: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400',
        amenities: ['WiFi', 'Parking', 'Breakfast'],
      },
    ];
  },

  getWeather: async (location: string): Promise<WeatherData> => {
    await delay(300);
    
    const conditions = ['Cerah', 'Berawan', 'Hujan Ringan', 'Sunny', 'Cloudy'];
    const icons = ['☀️', '⛅', '🌤️', '🌧️', '☁️'];
    
    return {
      location,
      temperature: Math.floor(Math.random() * 10) + 25,
      condition: conditions[Math.floor(Math.random() * conditions.length)],
      humidity: Math.floor(Math.random() * 30) + 60,
      windSpeed: Math.floor(Math.random() * 15) + 5,
      icon: icons[Math.floor(Math.random() * icons.length)],
    };
  },

  getLocalEvents: async (location: string): Promise<LocalEvent[]> => {
    await delay(400);
    
    return [
      {
        id: '1',
        name: `Festival Budaya ${location}`,
        date: '2025-11-15',
        location: location,
        category: 'Budaya',
        imageUrl: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400',
      },
      {
        id: '2',
        name: `Konser Musik ${location}`,
        date: '2025-11-20',
        location: location,
        category: 'Hiburan',
        imageUrl: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=400',
      },
      {
        id: '3',
        name: `Pameran Seni ${location}`,
        date: '2025-11-25',
        location: location,
        category: 'Seni',
        imageUrl: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400',
      },
    ];
  },
};
