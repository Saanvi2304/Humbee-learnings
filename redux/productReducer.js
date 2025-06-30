const initialState = {
  products: [],
  loading: true,
  error: null,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_PRODUCTS_SUCCESS':
      return {...state, products: action.payload, loading: false};
    case 'FETCH_PRODUCTS_FAILURE':
      return {...state, error: action.payload, loading: false};
    default:
      return state;
  }
};

export default productReducer;

export const fetchProducts = () => async dispatch => {
  try {
    const response = await fetch('https://api.escuelajs.co/api/v1/products');
    const data = await response.json();
    dispatch({type: 'FETCH_PRODUCTS_SUCCESS', payload: data});
  } catch (error) {
    dispatch({type: 'FETCH_PRODUCTS_FAILURE', payload: error.message});
  }
};
