import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  accent?: "uf" | "utm" | "clp";
}

export function Card({ children, className = "", accent }: CardProps) {
  const classes = ["card", accent && `card--${accent}`, className]
    .filter(Boolean)
    .join(" ");

  return <div className={classes}>{children}</div>;
}
