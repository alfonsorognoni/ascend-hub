const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
const apiUrl = import.meta.env.VITE_WEATHER_API_URL;

export interface Weather {
  current: {
    temp_c: number;
    temp_f: number;
    humidity: number;
    pressure: number;
    wind_mph: number;
    wind_kph: number;
    wind_degree: number;
    weather_code: number;
    weather_icon_url: string;
    weather_description: string;
  };
}

export const getWeather = async ({
  location,
}: {
  location: string;
}): Promise<Weather> => {
  const response = await fetch(
    `${apiUrl}/current.json?key=${apiKey}&q=${location}`
  );
  const data = await response.json();
  return data;
};
