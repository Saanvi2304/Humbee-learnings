const initialstate = {
  items: [],
};

const cartReducer = (state = initialstate, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItem = state.items.find(
        item => item.id === action.payload.id,
      );
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? {...item, quantity: item.quantity + 1}
              : item,
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, {...action.payload, quantity: 1}],
      };

    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? {
                ...item,
                quantity: Math.max(1, item.quantity + action.payload.amount),
              }
            : item,
        ),
      };

    default:
      return state;
  }
};


export const addToCart = item => ({
  type: 'ADD_TO_CART',
  payload: item,
});

export const updateQuantity = (productId, amount) => ({
  type: 'UPDATE_QUANTITY',
  payload: {id: productId, amount}
});

export default cartReducer;