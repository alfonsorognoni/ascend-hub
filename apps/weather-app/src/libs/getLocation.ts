// get location from autocomplete
const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
const apiUrl = import.meta.env.VITE_WEATHER_API_URL;

export interface Location {
  id: number;
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  url: string;
}

interface LocationResponse {
  data: Location[];
}

export const getLocation = async ({
  search,
}: {
  search: string;
}): Promise<LocationResponse> => {
  const response = await fetch(
    `${apiUrl}/search.json?key=${apiKey}&q=${search}`
  );
  try {
    const data = await response.json();
    return { data };
  } catch {
    throw new Error("Failed to fetch locations");
  }
};
