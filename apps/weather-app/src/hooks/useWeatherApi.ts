import { useCallback, useState } from "react";
import { getLocation, Location } from "../libs/getLocation";
import { Weather, getWeather } from "../libs/getWeather";

const useWeatherApi = () => {
  const [locationList, setLocationList] = useState<Location[]>([]);
  const [weather, setWeather] = useState<Weather | null>(null);

  const fetchLocation = useCallback(async ({ search }: { search: string }) => {
    if (!search || search.length < 3) {
      setLocationList([]);
      return null;
    }
    const { data } = await getLocation({ search });

    setLocationList(data);
  }, []);

  const fetchWeather = useCallback(
    async ({ location }: { location: string }) => {
      const weather = await getWeather({ location });
      setWeather(weather);
    },
    []
  );

  return {
    fetchLocation,
    fetchWeather,
    locationList,
    weather,
  };
};

export default useWeatherApi;
