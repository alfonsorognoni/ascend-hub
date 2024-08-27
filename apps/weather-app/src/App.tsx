import { useEffect, useRef, useState } from "react";
import "./App.css";
import { useDebounce } from "./hooks/useDebounce";
import useWeatherApi from "./hooks/useWeatherApi";

function App() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [search, setSearch] = useState("");

  const {
    fetchLocation,
    locationList: locationListState,
    fetchWeather,
    weather: weatherState,
  } = useWeatherApi();

  const debouncedSearch = useDebounce(search, 500);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleLocation = (location: string) => {
    fetchWeather({ location });
    if (inputRef.current) {
      inputRef.current.value = "";
      setSearch("");
    }
  };

  useEffect(() => {
    fetchLocation({ search: debouncedSearch });
  }, [debouncedSearch, fetchLocation]);

  return (
    <>
      <h1>Vite + React</h1>
      <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
        Weather App
      </h2>
      <section className="card">
        <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ">
          <div className="mb-5">
            <label
              htmlFor="location"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Enter your location
            </label>
            <input
              type="text"
              id="location"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@flowbite.com"
              required
              onChange={handleSearch}
              ref={inputRef}
            />

            {locationListState.length > 0 && (
              <div className="flex flex-col gap-2">
                {locationListState.map((location) => (
                  <div
                    onClick={() => handleLocation(location.name)}
                    key={location.id}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-900 rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 dark:text-white"
                  >
                    <p className="font-medium">{location.name}</p>
                    <p className="text-gray-500 truncate">{location.region}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {weatherState?.location?.name}
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            {weatherState?.current?.temp_c} °C
          </p>
        </div>
      </section>
    </>
  );
}

export default App;
