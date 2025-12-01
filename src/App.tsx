import DailyForecast from "./components/cards/DailyForecast";
import HourlyForecast from "./components/cards/HourlyForecast";
import CurrentWeather from "./components/cards/CurrentWeather";
import AdditionalInfo from "./components/cards/AdditionalInfo";
import Map from "./components/Map";
import { Suspense, useState } from "react";
import type { Coords } from "./types";
import LocationDropdown from "./components/dropdowns/LocationDropdown";
import { useQuery } from "@tanstack/react-query";
import { fetchCityCoordinates } from "./api";
import MapTypeDropdown from "./components/dropdowns/MapTypeDropdown";
import MapLegend from "./components/MapLegend";
import CurrentSkeleton from "./components/skeletons/CurrentSkeleton";
import HourlySkeleton from "./components/skeletons/HourlySkeleton";
import DailySkeleton from "./components/skeletons/DailySkeleton";
import AdditionalInfoSkeleton from "./components/skeletons/AdditionalInfoSkeleton";

function App() {
  const [coordinates, setCoordinates] = useState<Coords>({
    lat: 50,
    lon: 45,
  });
  const [city, setCity] = useState("Ulaanbaatar");
  const [mapType, setMapType] = useState("clouds_new");

  const { data: geoCodeData } = useQuery({
    queryKey: ["geocode", city],
    queryFn: () => fetchCityCoordinates(city),
  });

  const onMapClick = (lat: number, lon: number) => {
    setCoordinates({ lat, lon });
    setCity("custom");
  };

  const coords =
    city === "custom"
      ? coordinates
      : { lat: geoCodeData?.[0].lat ?? 0, lon: geoCodeData?.[0].lon ?? 0 };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex gap-8">
        <div className="flex gap-4">
          <h1 className="text-xl font-semibold">Location: </h1>
          <LocationDropdown city={city} setCity={setCity} />
        </div>
        <div className="flex gap-4">
          <h1 className="text-xl font-semibold">Map Type: </h1>
          <MapTypeDropdown mapType={mapType} setMapType={setMapType} />
        </div>
      </div>
      <div className="relative">
        <Map coords={coords} onMapClick={onMapClick} mapType={mapType} />
        <MapLegend mapType={mapType} />
      </div>
      <Suspense fallback={<CurrentSkeleton />}>
        <CurrentWeather coords={coords} />
      </Suspense>
      <Suspense fallback={<HourlySkeleton />}>
        <HourlyForecast coords={coords} />
      </Suspense>
      <Suspense fallback={<DailySkeleton />}>
        <DailyForecast coords={coords} />
      </Suspense>
      <Suspense fallback={<AdditionalInfoSkeleton />}>
        <AdditionalInfo coords={coords} />
      </Suspense>
    </div>
  );
}

export default App;
