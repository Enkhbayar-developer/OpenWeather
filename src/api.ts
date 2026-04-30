import { GeocodeSchema } from "./schemas/geocodeSchema";
import { WeatherSchema } from "./schemas/weatherSchema";
import { PollutionSchema } from "./schemas/PollutionSchema";

async function getApiKey() {
  const API_KEY = await fetch("https://openweather-api-21sx.onrender.com").then(
    (res) => res.text(),
  );
  return API_KEY;
}
const API_KEY = await getApiKey();

export async function fetchData({ lat, lon }: { lat: number; lon: number }) {
  const response = await fetch(
    `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely,alerts&appid=${API_KEY}`,
  );
  const data = await response.json();
  return WeatherSchema.parse(data);
}

export async function fetchCityCoordinates(city: string) {
  const response = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`,
  );
  const data = await response.json();
  return GeocodeSchema.parse(data);
}

export async function getAirPollution({
  lat,
  lon,
}: {
  lat: number;
  lon: number;
}) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`,
  );
  const data = await response.json();
  return PollutionSchema.parse(data);
}
