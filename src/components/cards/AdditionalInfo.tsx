import { useSuspenseQuery } from "@tanstack/react-query";
import Cloud from "../../assets/cloud.svg?react";
import Pressure from "../../assets/pressure.svg?react";
import Sunrise from "../../assets/sunrise.svg?react";
import Sunset from "../../assets/sunset.svg?react";
import UV from "../../assets/cloud.svg?react";
import Wind from "../../assets/wind.svg?react";
import Card from "./Card";
import { fetchData } from "../../api";
import type { Coords } from "../../types";

type Props = { coords: Coords };

export default function AdditionalInfo({ coords }: Props) {
  const { data } = useSuspenseQuery({
    queryKey: ["weather", coords],
    queryFn: () => fetchData({ lat: coords.lat, lon: coords.lon }),
  });

  return (
    <Card
      title="Ерөнхий мэдээлэл"
      childrenClassName="grid grid-cols-1 md:grid-cols-2 gap-8 2xl:gap-4"
    >
      {rows.map(({ label, value, Icon }) => (
        <div className="flex justify-between">
          <div className="flex gap-4">
            <span className="text-gray-500">{label}</span>
            <Icon className="size-8" />
          </div>
          <span>
            <FormatComponent value={value} number={data.current[value]} />
          </span>
        </div>
      ))}
    </Card>
  );
}

function FormatComponent({ value, number }: { value: string; number: number }) {
  if (value === "sunrise" || value === "sunset")
    return new Date(number * 1000).toLocaleTimeString(undefined, {
      hour: "numeric",
      minute: "2-digit",
      hour12: false,
    });

  if (value === "wind_deg") return `${number}°`;
  return number;
}

const rows = [
  {
    label: "Үүлшилт (%)",
    value: "clouds",
    Icon: Cloud,
  },
  {
    label: "UV индекс",
    value: "uvi",
    Icon: UV,
  },
  {
    label: "Салхины чиглэл",
    value: "wind_deg",
    Icon: Wind,
  },
  {
    label: "Агаарын даралт (hPa)",
    value: "pressure",
    Icon: Pressure,
  },
  {
    label: "Нар мандах",
    value: "sunrise",
    Icon: Sunrise,
  },
  {
    label: "Нар жаргах",
    value: "sunset",
    Icon: Sunset,
  },
] as const;
