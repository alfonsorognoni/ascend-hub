import { useCallback, useReducer } from "react";
import { getLocation, Location } from "../libs/getLocation";
import { Weather, getWeather } from "../libs/getWeather";

interface WeatherState {
  locationList: Location[];
  weather: Weather | null;
  isLoadingLocations: boolean;
  isLoadingWeather: boolean;
  error: string | null;
}

type Action =
  | { type: "FETCH_LOCATIONS_SUCCESS"; payload: Location[] }
  | { type: "FETCH_LOCATIONS_FAILURE"; payload: string }
  | { type: "FETCH_WEATHER_SUCCESS"; payload: Weather }
  | { type: "FETCH_WEATHER_FAILURE"; payload: string }
  | { type: "SET_LOADING_LOCATIONS"; payload: boolean }
  | { type: "SET_LOADING_WEATHER"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "SET_LOCATION_LIST"; payload: Location[] };

const initialState: WeatherState = {
  locationList: [],
  weather: null,
  isLoadingLocations: false,
  isLoadingWeather: false,
  error: null,
};

const weatherReducer = (state: WeatherState, action: Action): WeatherState => {
  switch (action.type) {
    case "FETCH_LOCATIONS_SUCCESS":
      return {
        ...state,
        locationList: action.payload,
        isLoadingLocations: false,
      };
    case "FETCH_LOCATIONS_FAILURE":
      return {
        ...state,
        error: action.payload,
        isLoadingLocations: false,
      };
    case "FETCH_WEATHER_SUCCESS":
      return {
        ...state,
        weather: action.payload,
        isLoadingWeather: false,
      };
    case "FETCH_WEATHER_FAILURE":
      return {
        ...state,
        error: action.payload,
        isLoadingWeather: false,
      };
    case "SET_LOADING_LOCATIONS":
      return {
        ...state,
        isLoadingLocations: action.payload,
      };
    case "SET_LOADING_WEATHER":
      return {
        ...state,
        isLoadingWeather: action.payload,
      };
    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    case "SET_LOCATION_LIST":
      return {
        ...state,
        locationList: action.payload,
      };
    default:
      return state;
  }
};

const useWeatherApi = () => {
  const [state, dispatch] = useReducer(weatherReducer, initialState);

  const fetchLocation = useCallback(async ({ search }: { search: string }) => {
    if (!search || search.length < 3) {
      dispatch({ type: "SET_LOCATION_LIST", payload: [] });
      return null;
    }
    dispatch({ type: "SET_LOADING_LOCATIONS", payload: true });
    try {
      const { data } = await getLocation({ search });
      dispatch({ type: "FETCH_LOCATIONS_SUCCESS", payload: data });
    } catch (error) {
      dispatch({
        type: "FETCH_LOCATIONS_FAILURE",
        payload: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }, []);

  const fetchWeather = useCallback(
    async ({ location }: { location: string }) => {
      dispatch({ type: "SET_LOADING_WEATHER", payload: true });
      try {
        const weather = await getWeather({ location });
        dispatch({ type: "FETCH_WEATHER_SUCCESS", payload: weather });
      } catch (error) {
        dispatch({
          type: "FETCH_WEATHER_FAILURE",
          payload: error instanceof Error ? error.message : "Unknown error",
        });
      }
    },
    []
  );

  return {
    ...state,
    fetchLocation,
    fetchWeather,
  };
};

export default useWeatherApi;
