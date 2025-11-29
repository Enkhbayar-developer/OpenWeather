import DailyForecast from "./components/cards/DailyForecast";
import HourlyForecast from "./components/cards/HourlyForecast";
import CurrentWeather from "./components/cards/CurrentWeather";
import AdditionalInfo from "./components/cards/AdditionalInfo";
import Map from "./components/Map";
import { useState } from "react";
import type { Coords } from "./types";

function App() {
  const [coordinates, setCoordinates] = useState<Coords>({
    lat: 50,
    lon: 45,
  });

  const onMapClick = (lat: number, lon: number) => {
    setCoordinates({ lat, lon });
  };

  return (
    <div className="flex flex-col gap-8">
      <Map coords={coordinates} onMapClick={onMapClick} />
      <CurrentWeather coords={coordinates} />
      <HourlyForecast coords={coordinates} />
      <DailyForecast coords={coordinates} />
      <AdditionalInfo coords={coordinates} />
    </div>
  );
}

export default App;
