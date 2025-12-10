import Card from "./Card";
import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchData } from "../../api";
import WeatherIcon from "../WeatherIcon";
import type { Coords } from "../../types";
import { translateToMongolian } from "@/utils/translator";

type Props = { coords: Coords };

export default function DailyForecast({ coords }: Props) {
  const { data } = useSuspenseQuery({
    queryKey: ["weather", coords],
    queryFn: () => fetchData({ lat: coords.lat, lon: coords.lon }),
  });

  return (
    <Card
      title="Долоо хоногийн төлөв"
      childrenClassName="flex flex-col gap-4 2xl:gap-2 2xl:justify-between"
    >
      {data?.daily.map((day) => (
        <div key={day.dt} className="flex justify-between">
          <p className="w-9">
            {new Date(day.dt * 1000).toLocaleDateString(undefined, {
              weekday: "short",
            })}
          </p>
          <WeatherIcon src={day.weather[0].icon} />
          <p>{Math.round(day.temp.day)}°C</p>
          <p className="text-gray-500/75">{Math.round(day.temp.max)}°C</p>
          <p className="text-gray-500/75">{Math.round(day.temp.min)}°C</p>
        </div>
      ))}
    </Card>
  );
}
