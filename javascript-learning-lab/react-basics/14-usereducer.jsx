/*
MID-LEVEL GOAL:
Use useReducer effectively for complex state logic and understand when it is superior to multiple useState calls.

REAL WORLD USE CASE:
- Form wizards with many interdependent fields
- Shopping carts and checkout flows
- Finite state machines in UI (modals, steppers, games)
- Undo/redo functionality

CONCEPTS COVERED:
- Reducer as single source of truth
- Action types and discriminated unions (in TS)
- useReducer with useContext for global state
- Immutability patterns in reducers
- Testing reducers independently
*/

// ============================================
// STEP 1: Basic reducer
// ============================================

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM':
      return {
        ...state,
        items: [...state.items, action.payload]
      };
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(i => i.id !== action.payload.id)
      };
    case 'UPDATE_QTY':
      return {
        ...state,
        items: state.items.map(i =>
          i.id === action.payload.id
            ? { ...i, quantity: action.payload.quantity }
            : i
        )
      };
    default:
      return state;
  }
}

// ============================================
// STEP 2: Using the reducer
// ============================================

function ShoppingCart() {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  const addItem = (item) => dispatch({ type: 'ADD_ITEM', payload: item });

  // ...
}

// ============================================
// STEP 3: Combining with context
// ============================================

const CartContext = createContext(null);

function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

/*
DEEPER BREAKDOWN:

useReducer shines when:
- Next state depends on previous in complex ways
- Multiple pieces of state need to be updated together
- You want to test state transitions in isolation

Dispatch is stable, so it can be passed down without useCallback in many cases.

MID-LEVEL PERSPECTIVE:

Reducers force you to think declaratively about state transitions. This becomes invaluable as UI complexity grows.

COMMON PITFALLS:

- Putting too much logic inside the reducer instead of action creators or middleware
- Mutating state inside the reducer
- Using useReducer for every piece of state (overkill)
- Forgetting to handle default case

EXPERIMENTS:

1. Add undo/redo support to a reducer by keeping a history array.
2. Convert a complex form with 8 useState calls into a single reducer.
3. Implement a reducer that validates transitions (e.g. cannot go from 'paid' back to 'pending').

MID-LEVEL CHALLENGE:

Build a reducer + context based state machine for a multi-step checkout:
- steps: cart → shipping → payment → review → complete
- Support going back, skipping optional steps, and resetting
- Include loading and error states per step
- All transitions must be explicit actions
*/