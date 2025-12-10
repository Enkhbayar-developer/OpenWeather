import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchData } from "../../api";
import Card from "./Card";
import WeatherIcon from "../WeatherIcon";
import type { Coords } from "../../types";
import { translateToMongolian } from "@/utils/translator";

type Props = {
  coords: Coords;
};

export default function CurrentWeather({ coords }: Props) {
  const { data } = useSuspenseQuery({
    queryKey: ["weather", coords],
    queryFn: () => fetchData({ lat: coords.lat, lon: coords.lon }),
  });

  return (
    <Card
      title="Яг одоо"
      className="md:pb-11"
      childrenClassName="flex flex-col items-center gap-6 2xl:justify-between"
    >
      <div className="flex flex-col gap-2 items-center">
        <h2 className="text-6xl font-semibold text-center">
          {Math.round(data.current.temp)}°C
        </h2>
        <WeatherIcon src={data.current.weather[0].icon} className="size-14" />
        <h3 className="capitalize text-xl">
          {translateToMongolian(data.current.weather[0].description)}
        </h3>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-xl text-center">Орон нутгийн цагаар: </p>
        <h3 className="text-4xl font-semibold text-center">
          {new Intl.DateTimeFormat("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
            timeZone: data.timezone,
          }).format(new Date(data.current.dt * 1000))}
        </h3>
      </div>
      <div className="flex justify-between w-full">
        <div className="flex flex-col items-center gap-2">
          <p className="text-gray-500">Мэдрэгдэх</p>
          <p>{Math.round(data.current.feels_like)}°C</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <p className="text-gray-500">Чийгшил</p>
          <p>{Math.round(data.current.humidity)}%</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <p className="text-gray-500">Салхи</p>
          <p>{Math.round(data.current.wind_speed)}м/с</p>
        </div>
      </div>
    </Card>
  );
}
