# Mi Galería de Productos (Versión Avanzada)

Este mini-proyecto cumple los requisitos del ejercicio:
- Composición de componentes con múltiples niveles.
- Paso de props a través de componentes intermedios (prop drilling controlado).
- Props con estructuras complejas (objetos y arrays).
- Renderizado de listas con `.map()`.
- Renderizado condicional según `enStock` y `precio.enOferta`.
- Uso de `props.children` a través de varios niveles (se inyecta un botón desde `GaleriaProductos` hasta `DetallesProducto`).

## Estructura
```
src/
  App.jsx
  main.jsx
  datos/
    Productos.js
  components/
    GaleriaProductos.jsx
    FichaProducto.jsx
    CabeceraFicha.jsx
    ImagenProducto.jsx
    DetallesProducto.jsx
    PieFicha.jsx
index.html
```

## Cómo ejecutar con Vite (recomendado)
1. Crea un proyecto Vite vacío (React):
   ```bash
   npm create vite@latest mi-galeria -- --template react
   cd mi-galeria
   npm install
   ```
2. Sustituye el contenido de tu carpeta `mi-galeria/` por los archivos de este zip (conserva `package.json` y `vite.config.js`).
3. Arranca el servidor de desarrollo:
   ```bash
   npm run dev
   ```

También puedes integrarlo en tu proyecto actual copiando `src/` e `index.html` y ajustando rutas si fuera necesario.
