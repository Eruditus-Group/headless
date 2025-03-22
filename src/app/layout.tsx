import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        {/* Cargar los estilos de WordPress */}
        <link rel="stylesheet" href="https://server.eruditus.group/wp-content/themes/tu-tema/style.css" />
      </head>
      <body>{children}</body>
    </html>
  );
}