import { getAirPollution } from "@/api";
import type { Coords } from "@/types";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Suspense, type Dispatch, type SetStateAction } from "react";
import Card from "./cards/Card";
import { Slider } from "./ui/slider";
import clsx from "clsx";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import Info from "../assets/info.svg?react";
import Chevron from "../assets/chevronleft.svg?react";
import SidePanelSkeleton from "./skeletons/SidePanelSkeleton";

type Props = {
  coords: Coords;
  isSidePanelOpen: boolean;
  setIsSidePanelOpen: Dispatch<SetStateAction<boolean>>;
};

export default function SidePanel(props: Props) {
  const { isSidePanelOpen, setIsSidePanelOpen } = props;
  return (
    <div
      className={clsx(
        "fixed top-0 right-0 h-screen w-(--sidebar-width) shadow-md bg-sidebar z-1001 py-8 px-4 overflow-y-scroll transition-transform duration-300 lg:translate-x-0!",
        isSidePanelOpen ? "translate-x-0" : "translate-x-full"
      )}
    >
      <button onClick={() => setIsSidePanelOpen(false)}>
        <Chevron className="size-8 -ml-2 lg:hidden" />
      </button>
      <Suspense fallback={<SidePanelSkeleton />}>
        <AirPollution {...props} />
      </Suspense>
    </div>
  );
}

function AirPollution({ coords }: Props) {
  const { data } = useSuspenseQuery({
    // include coords in the key so the query refetches when location changes
    queryKey: ["pollution", coords?.lat, coords?.lon],
    queryFn: () => getAirPollution({ lat: coords.lat, lon: coords.lon }),
    // only run when we have coordinates
    enabled: Boolean(coords?.lat && coords?.lon),
  });

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-4xl font-semibold">Агаарын чанар</h1>
      <h1 className="text-4xl font-semibold">
        {data?.list?.[0]?.main?.aqi ?? "-"}
      </h1>
      <div className="flex items-center gap-2">
        <h1 className="text-5xl font-semibold">АЧИ</h1>
        <Tooltip>
          <TooltipTrigger>
            <Info className="size-4" />
          </TooltipTrigger>
          <TooltipContent className="z-2000">
            <p className="max-w-xs">
              Агаарын чанарын индекс. Боломжит үр дүн: 1, 2, 3, 4, 5. 1 = Сайн,
              2 = Хэвийн, 3 = Дундаж, 4 = Муу, 5 = Маш муу.
            </p>
          </TooltipContent>
        </Tooltip>
      </div>
      {Object.entries(data?.list?.[0]?.components || {}).map(([key, value]) => {
        const pollutant =
          airQualityRanges[key.toUpperCase() as keyof AirQualityRanges];
        const max = Math.max(pollutant["Маш муу"].min, value);
        const currentLevel = (() => {
          for (const [level, range] of Object.entries(pollutant)) {
            if (
              value >= range.min &&
              (range.max === null || value <= range.max)
            )
              return level;
          }
          return "Маш муу";
        })();

        const qualityColor = () => {
          switch (currentLevel) {
            case "Сайн":
              return "bg-green-500";
            case "Боломжит":
              return "bg-yellow-500";
            case "Дундаж":
              return "bg-orange-500";
            case "Муу":
              return "bg-red-500";
            case "Маш муу":
              return "bg-purple-500";
            default:
              return "bg-zinc-500";
          }
        };
        return (
          <Card
            key={key}
            childrenClassName="flex flex-col gap-3"
            className="hover:scale-105 transition-transform duration-300 from-sidebar-accent to-sidebar-accent/60 gap-0"
          >
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold capitalize">{key}</span>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="size-4" />
                  </TooltipTrigger>
                  <TooltipContent className="z-2000">
                    <p className="max-w-xs">
                      {pollutantNameMapping[key.toUpperCase()]}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <span className="text-lg font-semibold">{value}</span>
            </div>
            <Slider min={0} max={max} value={[value]} disabled />
            <div className="flex justify-between text-xs">
              <p>0</p>
              <p>{max}</p>
            </div>
            <div className="flex justify-between">
              {Object.keys(pollutant).map((quality) => (
                <span
                  key={quality}
                  className={clsx(
                    "px-2 py-1 text-xs font-medium rounded-md",
                    quality === currentLevel
                      ? qualityColor()
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {quality}
                </span>
              ))}
            </div>
          </Card>
        );
      })}
    </div>
  );
}

type AirQualityLevel = "Сайн" | "Боломжит" | "Дундаж" | "Муу" | "Маш муу";

interface Range {
  min: number;
  max: number | null;
}

type Pollutant = "SO2" | "NO2" | "PM10" | "PM2_5" | "O3" | "CO" | "NO" | "NH3";

type AirQualityRanges = Record<Pollutant, Record<AirQualityLevel, Range>>;

const airQualityRanges: AirQualityRanges = {
  SO2: {
    Сайн: { min: 0, max: 20 },
    Боломжит: { min: 20, max: 80 },
    Дундаж: { min: 80, max: 250 },
    Муу: { min: 250, max: 350 },
    "Маш муу": { min: 350, max: null },
  },
  NO2: {
    Сайн: { min: 0, max: 40 },
    Боломжит: { min: 40, max: 70 },
    Дундаж: { min: 70, max: 150 },
    Муу: { min: 150, max: 200 },
    "Маш муу": { min: 200, max: null },
  },
  PM10: {
    Сайн: { min: 0, max: 20 },
    Боломжит: { min: 20, max: 50 },
    Дундаж: { min: 50, max: 100 },
    Муу: { min: 100, max: 200 },
    "Маш муу": { min: 200, max: null },
  },
  PM2_5: {
    Сайн: { min: 0, max: 10 },
    Боломжит: { min: 10, max: 25 },
    Дундаж: { min: 25, max: 50 },
    Муу: { min: 50, max: 75 },
    "Маш муу": { min: 75, max: null },
  },
  O3: {
    Сайн: { min: 0, max: 60 },
    Боломжит: { min: 60, max: 100 },
    Дундаж: { min: 100, max: 140 },
    Муу: { min: 140, max: 180 },
    "Маш муу": { min: 180, max: null },
  },
  CO: {
    Сайн: { min: 0, max: 4400 },
    Боломжит: { min: 4400, max: 9400 },
    Дундаж: { min: 9400, max: 12400 },
    Муу: { min: 12400, max: 15400 },
    "Маш муу": { min: 15400, max: null },
  },
  NO: {
    Сайн: { min: 0, max: 20 },
    Боломжит: { min: 20, max: 40 },
    Дундаж: { min: 40, max: 60 },
    Муу: { min: 60, max: 80 },
    "Маш муу": { min: 80, max: null },
  },
  NH3: {
    Сайн: { min: 0, max: 40 },
    Боломжит: { min: 40, max: 70 },
    Дундаж: { min: 70, max: 150 },
    Муу: { min: 150, max: 200 },
    "Маш муу": { min: 200, max: null },
  },
};

const pollutantNameMapping: Record<Pollutant, string> = {
  SO2: "Хүхрийн давхар исэл",
  NO2: "Азотын давхар исэл",
  PM10: "Тоосонцор 10",
  PM2_5: "Нарийн тоосонцор",
  O3: "Озон",
  CO: "Нүүрстөрөгчийн дутуу исэл",
  NO: "Азотын дутуу исэл",
  NH3: "Аммиак",
};
