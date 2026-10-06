import type { ReactNode } from "react";

interface ShinyButtonProps {
  children: ReactNode;
  href: string;
}

export default function ShinyButton({ children, href }: ShinyButtonProps) {
  return (
    <a className="shiny-cta" href={href}>
      <span>{children}</span>
    </a>
  );
}
