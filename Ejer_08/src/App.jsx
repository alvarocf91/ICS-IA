import { useReducer, useCallback, useMemo } from "react"
import products from "./data/productos.json"
import { cartReducer, initialState } from "./cartReducer"

export default function App() {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  const addToCart = useCallback(product => {
    dispatch({ type: "ADD", payload: product })
  }, [])

  const increment = useCallback(id => {
    dispatch({ type: "INCREMENT", payload: id })
  }, [])

  const decrement = useCallback(id => {
    dispatch({ type: "DECREMENT", payload: id })
  }, [])

  const remove = useCallback(id => {
    dispatch({ type: "REMOVE", payload: id })
  }, [])

  const total = useMemo(() => {
    return state.cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    )
  }, [state.cart])

  return (
    <div style={{ display: "flex", gap: "40px", padding: "20px" }}>
      <div>
        <h2>Productos</h2>
        {products.map(p => (
          <div key={p.id}>
            <strong>{p.name}</strong> - ${p.price}
            <button onClick={() => addToCart(p)}>Añadir</button>
          </div>
        ))}
      </div>

      <div>
        <h2>Carrito</h2>
        {state.cart.map(item => (
          <div key={item.id}>
            {item.name} - {item.quantity}
            <button onClick={() => decrement(item.id)}>-</button>
            <button onClick={() => increment(item.id)}>+</button>
            <button onClick={() => remove(item.id)}>Eliminar</button>
          </div>
        ))}

        <h3>Total: ${total.toFixed(2)}</h3>
      </div>
    </div>
  )
}
