## Preguntas

### 1. Justificación de Arquitectura
`useReducer` es mejor que múltiples `useState` porque centraliza la gestión del estado complejo del carrito (productos, cantidades, precios) en un solo lugar.  
Si usáramos `useState` separados, al incrementar la cantidad de un producto podría calcularse el total con datos desfasados, mostrando un valor incorrecto. `useReducer` evita esta inconsistencia y facilita agregar futuras funcionalidades como descuentos o promociones.

### 2. Análisis de Rendimiento
Si un componente `BotonPromocion` se re-renderiza al añadir productos:  
- **Hipótesis:** alguna prop o función que recibe se recrea en cada render del padre.  
- **Verificación:** con React DevTools, activar “Highlight updates” y revisar las props de `BotonPromocion`.  
- **Solución:** usar `useCallback` para memoizar funciones pasadas como props y evitar renders innecesarios.
