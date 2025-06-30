export const fetchProducts = () => async (dispatch) => {
  try {
    const response = await fetch('https://api.escuelajs.co/api/v1/products');
    const data = await response.json();
    dispatch({ type: 'FETCH_PRODUCTS_SUCCESS', payload: data });
  } catch (error) {
    dispatch({ type: 'FETCH_PRODUCTS_FAILURE', payload: error.message });
  }
};

export const addToCart = (item) => ({
  type: 'ADD_TO_CART',
  payload: item
});