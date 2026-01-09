export const initialState = {
  cart: []
}

export function cartReducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const existing = state.cart.find(p => p.id === action.payload.id)

      if (existing) {
        return {
          cart: state.cart.map(p =>
            p.id === action.payload.id
              ? { ...p, quantity: p.quantity + 1 }
              : p
          )
        }
      }

      return {
        cart: [...state.cart, { ...action.payload, quantity: 1 }]
      }
    }

    case "INCREMENT":
      return {
        cart: state.cart.map(p =>
          p.id === action.payload
            ? { ...p, quantity: p.quantity + 1 }
            : p
        )
      }

    case "DECREMENT":
      return {
        cart: state.cart
          .map(p =>
            p.id === action.payload
              ? { ...p, quantity: p.quantity - 1 }
              : p
          )
          .filter(p => p.quantity > 0)
      }

    case "REMOVE":
      return {
        cart: state.cart.filter(p => p.id !== action.payload)
      }

    default:
      return state
  }
}
