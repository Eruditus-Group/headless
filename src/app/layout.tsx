"use client";
import { useEffect, useState } from "react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [styles, setStyles] = useState<string[]>([]);

  useEffect(() => {
    async function fetchStyles() {
      const res = await fetch("/api/styles");
      const cssFiles = await res.json();
      setStyles(cssFiles);
    }
    fetchStyles();
  }, []);

  return (
    <html lang="es">
      <head>
        {/* Cargar estilos dinámicos */}
        {styles.map((href, index) => (
          <link key={index} rel="stylesheet" href={href} />
        ))}
      </head>
      <body>{children}</body>
    </html>
  );
}