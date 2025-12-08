import { Switch } from "./ui/switch";
import Sun from "../../src/assets/sun.svg?react";
import Moon from "../../src/assets/moon.svg?react";

type Props = {};

export default function LIghtDarkToggle({}: Props) {
  return (
    <div className="flex items-center gap-2">
      <Sun className="size-5 invert" />
      <Switch />
      <Moon className="size-5 invert" />
    </div>
  );
}
