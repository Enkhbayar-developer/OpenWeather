import { GeocodeSchema } from "./schemas/geocodeSchema";
import { WeatherSchema } from "./schemas/weatherSchema";
import { PollutionSchema } from "./schemas/PollutionSchema";

const BASE = "https://openweather-api-21sx.onrender.com";

export async function fetchData({ lat, lon }: { lat: number; lon: number }) {
  const response = await fetch(`${BASE}/weather?lat=${lat}&lon=${lon}`);
  const data = await response.json();
  return WeatherSchema.parse(data);
}

export async function fetchCityCoordinates(city: string) {
  const response = await fetch(`${BASE}/geocode?city=${city}`);
  const data = await response.json();
  return GeocodeSchema.parse(data);
}

export async function getAirPollution({ lat, lon }: { lat: number; lon: number }) {
  const response = await fetch(`${BASE}/pollution?lat=${lat}&lon=${lon}`);
  const data = await response.json();
  return PollutionSchema.parse(data);
}
