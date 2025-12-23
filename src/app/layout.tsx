import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Buon Natale dal Team 3Bee! 🐝🎄",
  description: "Quest'anno le nostre api hanno imparato a dire HO HO HONEY! Tanti auguri di Buone Feste!",
  openGraph: {
    title: "Buon Natale dal Team 3Bee! 🐝🎄",
    description: "Quest'anno le nostre api hanno imparato a dire HO HO HONEY! Tanti auguri di Buone Feste!",
    images: [
      {
        url: "https://blog.3bee.com/_next/image/?url=https%3A%2F%2Fapi-backend-assets.s3.eu-south-1.amazonaws.com%2Fprivate%2Ffiler_public%2F24%2F43%2F24436c3b-3f76-474e-8462-8ef04f454a72%2F53d0b6a4-e592-47c8-bc18-127d1333d95c.png&w=3840&q=75",
        width: 1200,
        height: 630,
        alt: "3Bee Christmas Greetings",
      },
    ],
    locale: "it_IT",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Buon Natale dal Team 3Bee! 🐝🎄",
    description: "Quest'anno le nostre api hanno imparato a dire HO HO HONEY! Tanti auguri di Buone Feste!",
    images: ["https://blog.3bee.com/_next/image/?url=https%3A%2F%2Fapi-backend-assets.s3.eu-south-1.amazonaws.com%2Fprivate%2Ffiler_public%2F24%2F43%2F24436c3b-3f76-474e-8462-8ef04f454a72%2F53d0b6a4-e592-47c8-bc18-127d1333d95c.png&w=3840&q=75"],
  },
};

// Script per il click handler della preview (comunicazione con CREATORE)
const PREVIEW_CLICK_HANDLER = `
(function() {
  if (window.__previewClickHandlerInstalled) return;
  window.__previewClickHandlerInstalled = true;

  // Edit mode state - togglable from parent
  let editMode = true;

  const IGNORE_TAGS = ['HTML', 'HEAD', 'SCRIPT', 'STYLE', 'META', 'LINK', 'NOSCRIPT'];

  function findMeaningfulElement(target) {
    if (IGNORE_TAGS.includes(target.tagName)) return null;
    let current = target;
    while (current && current !== document.body) {
      if (current.dataset && current.dataset.componentId) return current;
      current = current.parentElement;
    }
    current = target;
    while (current && current !== document.body) {
      const tag = current.tagName.toLowerCase();
      const hasId = current.id && current.id.length > 0;
      const hasClass = current.classList && current.classList.length > 0;
      const isInteractive = ['button', 'a', 'input', 'select', 'textarea', 'form', 'nav', 'header', 'footer', 'main', 'section', 'article', 'aside', 'div', 'span', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'img'].includes(tag);
      if (hasId || hasClass || isInteractive) return current;
      current = current.parentElement;
    }
    return target;
  }

  // Solo se siamo in un iframe (preview mode)
  if (window.parent !== window) {
    // Create style element for hover effect
    const style = document.createElement('style');
    style.id = 'preview-edit-mode-style';
    style.textContent = 'body *{cursor:pointer!important}body *:hover{outline:2px solid #3b82f6!important;outline-offset:2px!important}';
    document.head.appendChild(style);

    // Listen for edit mode toggle from parent
    window.addEventListener('message', function(e) {
      if (e.data && e.data.type === 'set-edit-mode') {
        editMode = e.data.enabled;
        style.textContent = editMode
          ? 'body *{cursor:pointer!important}body *:hover{outline:2px solid #3b82f6!important;outline-offset:2px!important}'
          : '';
      }
    });

    document.addEventListener('click', function(e) {
      if (!editMode) return; // Allow normal navigation when edit mode is off

      const component = findMeaningfulElement(e.target);
      if (component && component !== document.body) {
        e.preventDefault();
        e.stopPropagation();
        window.parent.postMessage({
          type: 'component-click',
          componentId: component.dataset?.componentId || null,
          tagName: component.tagName.toLowerCase(),
          id: component.id || null,
          classList: Array.from(component.classList || []),
          textContent: (component.textContent || '').trim().slice(0, 100),
        }, '*');
      }
    }, true);
  }
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it">
      <head>
        <script dangerouslySetInnerHTML={{ __html: PREVIEW_CLICK_HANDLER }} />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
