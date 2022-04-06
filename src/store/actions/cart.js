export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART='REMOVE_FROM_CART';

export const addToCart = (dish) => {
  return { type: ADD_TO_CART, dish: dish};
};

export const removeFromCart = (dish) => {
  return{ type : REMOVE_FROM_CART, dish:dish };
};