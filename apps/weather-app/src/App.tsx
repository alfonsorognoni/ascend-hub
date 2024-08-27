import { useEffect, useState } from "react";
import "./App.css";

const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
const apiUrl = import.meta.env.VITE_WEATHER_API_URL;

// get location from autocomplete
const getLocation = async ({ search }) => {
  const response = await fetch(
    `${apiUrl}/search.json?key=${apiKey}&q=${search}`
  );
  const [data] = await response.json();
  return data;
};

// get weather data for location
const getWeather = async ({ location }) => {
  const response = await fetch(
    `${apiUrl}/current.json?key=${apiKey}&q=${location}`
  );
  const data = await response.json();
  return data;
};

function App() {
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    getLocation({ search: "New York" }).then((location) => {
      setLocation(location);
    });
  }, []);

  useEffect(() => {
    if (!location) return;
    getWeather({ location: location.name }).then((weather) => {
      setWeather(weather);
      console.log(weather);
    });
  }, [location]);

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
            />
          </div>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {location.name}
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            {weather?.current?.temp_c} °C
          </p>
        </div>
      </section>
    </>
  );
}

export default App;
