import { ADD_TO_CART, REMOVE_FROM_CART } from '../actions/cart';

const initialState = {
    items : [],
}

export default ( state = initialState, action ) => {
    switch(action.type){
        case ADD_TO_CART:
            
            const addedDish = action.dish;
            let cartItem;

            if(state.items[addedDish.id]) {
                //item already in cart
                cartItem = {...state.items[addedDish.id], qty: state.items[addedDish.id].qty + 1, itemTotal: state.items[addedDish.id].itemTotal + addedDish.price }
            } else {
                //item not in cart
                cartItem = { ...addedDish, qty: 1, itemTotal: addedDish.price }
            }
            return {
                ...state,
                items: { ...state.items, [addedDish.id] : cartItem }
            }
            
        case REMOVE_FROM_CART:

            const dishToRemove = action.dish;
            const quantity = dishToRemove.qty;
            let cartItemToRemove;
            let cartItems;
            if(quantity > 1) {
                //reduce qty not remove entirely
                cartItemToRemove = { ...dishToRemove, qty: state.items[dishToRemove.id].qty - 1, itemTotal: state.items[dishToRemove.id].itemTotal - dishToRemove.price }
                cartItems = { ...state.items, [dishToRemove.id] : cartItemToRemove }
            } else {
                //qty 1 so remove the item directly from list 
                cartItems = { ...state.items }
                delete cartItems[dishToRemove.id]
            }

            return {
                ...state,
                items: cartItems
            }
            
        default:
            return state;
    }
}