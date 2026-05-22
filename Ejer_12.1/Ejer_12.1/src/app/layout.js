import "./globals.css";

export const metadata = {
  title: "Gestor de imagenes",
  description: "Aplicacion Next.js para clasificar y buscar imagenes con IA",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
