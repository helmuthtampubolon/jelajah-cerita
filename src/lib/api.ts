// API interfaces and fetch wrapper for third-party integrations

export interface HotelSearchParams {
  location: string;
  checkIn: string;
  checkOut: string;
  guests: number;
}

export interface Hotel {
  id: string;
  name: string;
  rating: number;
  pricePerNight: number;
  imageUrl: string;
  amenities: string[];
}

export interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  icon: string;
}

export interface LocalEvent {
  id: string;
  name: string;
  date: string;
  location: string;
  category: string;
  imageUrl: string;
}

// Generic fetch wrapper with error handling
export async function fetcher<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}

// API functions (will use mock in development)
export const api = {
  searchHotels: async (params: HotelSearchParams): Promise<Hotel[]> => {
    // TODO: Replace with real API endpoint
    // return fetcher(`${process.env.VITE_API_BASE}/hotels/search`, {
    //   method: 'POST',
    //   body: JSON.stringify(params),
    // });
    throw new Error('Not implemented - use mock');
  },

  getWeather: async (location: string): Promise<WeatherData> => {
    // TODO: Replace with real weather API (OpenWeatherMap, WeatherAPI, etc.)
    // return fetcher(`${process.env.VITE_WEATHER_API}/current?q=${location}&key=${process.env.VITE_WEATHER_KEY}`);
    throw new Error('Not implemented - use mock');
  },

  getLocalEvents: async (location: string): Promise<LocalEvent[]> => {
    // TODO: Replace with real events API
    // return fetcher(`${process.env.VITE_API_BASE}/events?location=${location}`);
    throw new Error('Not implemented - use mock');
  },
};
