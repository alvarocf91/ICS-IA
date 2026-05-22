import "./globals.css";

export const metadata = {
  title: "Gestor de imagenes IA",
  description: "Carga, analiza y busca imagenes por su contenido"
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
