import React from "react";
import type { FooterProps } from "./Footer.props";

const DEFAULT_TEXT = "Con amore dal Team 3Bee 🐝 - Natale 2024";

export function Footer({
  id,
  text = DEFAULT_TEXT,
  className,
  variant = "default",
  isLoading = false,
  disabled = false,
}: FooterProps): React.JSX.Element {
  const baseClasses = [
    "absolute",
    "bottom-4",
    "left-0",
    "right-0",
    "text-center",
    "z-content",
    "px-4",
    "py-2",
    "font-sans",
    "text-sm",
    "tracking-wide",
    "transition-opacity",
    "duration-300",
  ];

  const variantClasses =
    variant === "default"
      ? ["text-white", "drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]"]
      : ["text-accent-300"];

  const stateClasses = disabled || isLoading ? ["opacity-50"] : ["opacity-100"];

  const combinedClasses = [...baseClasses, ...variantClasses, ...stateClasses, className]
    .filter(Boolean)
    .join(" ");

  if (isLoading) {
    return (
      <footer
        id={id}
        className={combinedClasses}
        aria-busy="true"
        aria-label="Caricamento footer"
      >
        <span
          id={`${id}-skeleton`}
          className="inline-block h-4 w-48 animate-pulse rounded bg-white/20"
        />
      </footer>
    );
  }

  return (
    <footer
      id={id}
      className={combinedClasses}
      aria-disabled={disabled}
    >
      <p id={`${id}-text`} className="m-0">
        <span className="text-white">Con amore dal </span>
        <span className="font-semibold text-bee-gold">Team 3Bee</span>
        <span className="text-bee-gold"> 🐝</span>
        <span className="text-white"> - </span>
        <span className="text-secondary-400">Natale 2024</span>
      </p>
    </footer>
  );
}

export default Footer;
