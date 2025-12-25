/**
 * Footer Component
 *
 * Elegant footer with "Con amore dal Team 3Bee" message.
 * Positioned at bottom center with white/gold styling on transparent background.
 *
 * Specs:
 * - text: "Con amore dal Team 3Bee 🐝 - Natale 2025"
 * - position: absolute bottom-4 center
 * - color: #FFFFFF with slight gold accent
 * - typography: 0.875rem, letter-spacing wide
 * - z_index: 5
 */

"use client";

import React from "react";
import { tv } from "tailwind-variants";
import type { FooterProps } from "./Footer.props";

const DEFAULT_TEXT = "Con amore dal Team 3Bee 🐝 - Natale 2025";

const footerVariants = tv({
  slots: {
    container: [
      "absolute",
      "bottom-4",
      "left-0",
      "right-0",
      "z-[5]",
      "flex",
      "justify-center",
      "items-center",
      "pointer-events-none",
    ],
    text: [
      "text-sm",
      "tracking-wide",
      "font-light",
      "text-center",
      "px-4",
      "py-2",
      "rounded-full",
      "backdrop-blur-sm",
      "transition-opacity",
      "duration-300",
    ],
    highlight: ["font-medium"],
  },
  variants: {
    variant: {
      light: {
        text: ["text-white", "bg-white/5"],
        highlight: ["text-amber-300"],
      },
      dark: {
        text: ["text-gray-800", "bg-black/5"],
        highlight: ["text-amber-600"],
      },
    },
    disabled: {
      true: {
        container: ["hidden"],
      },
    },
  },
  defaultVariants: {
    variant: "light",
    disabled: false,
  },
});

export function Footer({
  id,
  className,
  text = DEFAULT_TEXT,
  variant = "light",
  disabled = false,
}: FooterProps): React.JSX.Element {
  const styles = footerVariants({ variant, disabled });

  const renderText = () => {
    if (!text.includes("3Bee")) {
      return text;
    }

    const parts = text.split(/(3Bee)/);
    return parts.map((part, index) => {
      if (part === "3Bee") {
        return (
          <span key={index} className={styles.highlight()}>
            {part}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <footer
      id={id}
      data-testid={id}
      className={`footer ${styles.container()} ${className ?? ""}`}
      data-variant={variant}
      data-disabled={disabled ? "true" : undefined}
      role="contentinfo"
      aria-label="Footer"
    >
      <p className={styles.text()}>{renderText()}</p>
    </footer>
  );
}

export default Footer;
