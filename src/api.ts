import { GeocodeSchema } from "./schemas/geocodeSchema";
import { WeatherSchema } from "./schemas/weatherSchema";

const API_KEY = import.meta.env.VITE_API_KEY;

export async function fetchData({ lat, lon }: { lat: number; lon: number }) {
  const response = await fetch(
    `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely,alerts&appid=${API_KEY}`
  );
  const data = await response.json();
  return WeatherSchema.parse(data);
}

export async function fetchCityCoordinates(city: string) {
  const response = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
  );
  const data = await response.json();
  return GeocodeSchema.parse(data);
}
