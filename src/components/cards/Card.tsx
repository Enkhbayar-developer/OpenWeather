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
      <div className={childrenClassName}>{children}</div>
    </div>
  );
}
