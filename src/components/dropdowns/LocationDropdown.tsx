import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type Props = {
  city: string;
  setCity: (city: string) => void;
};

export default function LocationDropdown({ city, setCity }: Props) {
  return (
    <Select value={city} onValueChange={(value) => setCity(value)}>
      <SelectTrigger className="w-full xs:w-[180px]">
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent className="z-1001">
        {cities.map((city) => (
          <SelectItem key={city} value={city}>
            {city}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

const cities = [
  "Ulaanbaatar",
  "New York",
  "London",
  "Tokyo",
  "Paris",
  "Dubai",
  "Singapore",
  "Hong Kong",
  "Los Angeles",
  "Sydney",
  "Seoul",
  "Bangkok",
  "Berlin",
  "Toronto",
  "San Francisco",
  "Chicago",
  "Rome",
  "Barcelona",
  "Amsterdam",
  "Istanbul",
  "Mumbai",
  "Shanghai",
  "Beijing",
  "Melbourne",
  "Mexico City",
  "São Paulo",
];
