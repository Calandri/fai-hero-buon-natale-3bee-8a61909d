import type { Meta, StoryObj } from "@storybook/react";
import { HeroContent } from "@/components/HeroContent/HeroContent";
import { HERO_CONTENT_DEFAULTS } from "@/components/HeroContent/HeroContent.props";

const meta: Meta<typeof HeroContent> = {
  title: "Features/Hero/HeroContent",
  component: HeroContent,
  parameters: {
    componentId: "hero-content",
    layout: "fullscreen",
    backgrounds: {
      default: "dark",
    },
  },
  tags: ["autodocs"],
  argTypes: {
    id: {
      control: "text",
      description: "ID HTML obbligatorio per testing",
    },
    logoUrl: {
      control: "text",
      description: "URL del logo 3Bee",
    },
    headline: {
      control: "text",
      description: "Headline principale",
    },
    subheadline: {
      control: "text",
      description: "Sottotitolo con auguri",
    },
    isLoading: {
      control: "boolean",
      description: "Stato di caricamento",
    },
    error: {
      control: "text",
      description: "Messaggio di errore",
    },
    disabled: {
      control: "boolean",
      description: "Disabilita animazioni",
    },
    animationDelay: {
      control: { type: "number", min: 0, max: 2000, step: 100 },
      description: "Ritardo animazione in ms",
    },
  },
  decorators: [
    (Story) => (
      <div
        className="min-h-screen w-full bg-gradient-dark flex items-center justify-center"
        style={{
          background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f0f23 100%)",
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Stato default: logo 3Bee con decorazioni natalizie,
 * headline creativa e sottotitolo auguri.
 * Animazione fade-in + slide-up attiva.
 */
export const Default: Story = {
  args: {
    id: "hero-content-default",
    logoUrl: HERO_CONTENT_DEFAULTS.logoUrl,
    headline: HERO_CONTENT_DEFAULTS.headline,
    subheadline: HERO_CONTENT_DEFAULTS.subheadline,
  },
};

/**
 * Stato loading: mostra skeleton loader
 * mentre il contenuto viene caricato.
 */
export const Loading: Story = {
  args: {
    id: "hero-content-loading",
    isLoading: true,
  },
};

/**
 * Stato errore: mostra messaggio di errore
 * con possibilità di retry.
 */
export const WithError: Story = {
  args: {
    id: "hero-content-error",
    error: "Impossibile caricare il contenuto. Riprova più tardi.",
  },
};

/**
 * Stato disabled: nessuna animazione,
 * utile per testing o motivi di accessibilità.
 */
export const Disabled: Story = {
  args: {
    id: "hero-content-disabled",
    logoUrl: HERO_CONTENT_DEFAULTS.logoUrl,
    headline: HERO_CONTENT_DEFAULTS.headline,
    subheadline: HERO_CONTENT_DEFAULTS.subheadline,
    disabled: true,
  },
};

/**
 * Stato mobile: layout ottimizzato per
 * schermi piccoli (< 640px).
 */
export const Mobile: Story = {
  args: {
    id: "hero-content-mobile",
    logoUrl: HERO_CONTENT_DEFAULTS.logoUrl,
    headline: HERO_CONTENT_DEFAULTS.headline,
    subheadline: HERO_CONTENT_DEFAULTS.subheadline,
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile",
    },
  },
};

/**
 * Animazione con delay: l'animazione inizia
 * dopo il tempo specificato.
 */
export const WithAnimationDelay: Story = {
  args: {
    id: "hero-content-delayed",
    logoUrl: HERO_CONTENT_DEFAULTS.logoUrl,
    headline: HERO_CONTENT_DEFAULTS.headline,
    subheadline: HERO_CONTENT_DEFAULTS.subheadline,
    animationDelay: 500,
  },
};
