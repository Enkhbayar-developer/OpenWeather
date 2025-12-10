const dictionary: Record<string, string> = {
  "clear sky": "Цэлмэг",
  "few clouds": "Цөөн үүл",
  "scattered clouds": "Үүлэрхэг",
  "broken clouds": "Бүрхэг",
  "shower rain": "Нойтон цас",
  rain: "Бороо",
  thunderstorm: "Аадар бороо",
  snow: "Цас",
  mist: "Манан",
};

export function translateToMongolian(word: string): string {
  const key = word.toLowerCase();

  if (dictionary[key]) {
    return dictionary[key];
  }

  return "-";
}
