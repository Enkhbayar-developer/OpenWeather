import clsx from "clsx";
import { type ReactNode } from "react";

type Props = {
  children: ReactNode;
  title: string;
  childrenClassName?: string;
};

export default function Card({ children, title, childrenClassName }: Props) {
  return (
    <div className="p-4 rounded-xl bg-linear-to-br from-card to-card/60 shadow-md flex flex-col gap-4">
      <h1 className="text-2xl font-semibold">{title}</h1>
      <div
        className={clsx(
          childrenClassName,
          "animate-[FadeIn_0.6s_ease-out_forwards]"
        )}
      >
        {children}
      </div>
    </div>
  );
}
