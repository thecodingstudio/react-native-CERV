export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART='REMOVE_FROM_CART';
export const ORDER_TYPE = 'ORDER_TYPE';
export const ADD_DISCOUNT = 'ADD_DISCOUNT'
export const REMOVE_DISCOUNT = 'REMOVE_DISCOUNT'

export const addToCart = (dish) => {
  return { type: ADD_TO_CART, dish: dish};
};

export const removeFromCart = (dish) => {
  return{ type : REMOVE_FROM_CART, dish:dish};
};

export const setOrderType = ( orderType ) => {
  return { type : ORDER_TYPE, orderType: orderType };
}

export const applyDiscount = (discountCode) => {
  return { type: ADD_DISCOUNT, code: discountCode };
}

export const removeDiscount = () => {
  return { type: REMOVE_DISCOUNT };
}
