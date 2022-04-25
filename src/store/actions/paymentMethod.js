export const ACTIVATE_PAYMENT = 'ACTIVATE_PAYMENT';
export const ADD_CARD = 'ADD_CARD';
export const ADD_OTHER = 'ADD_OTHER';
export const GET_CARDS = 'GET_CARDS';

export const activatePayment = (id) => {
    return { type: ACTIVATE_PAYMENT, id }
}

export const addCard = (data) => {
    return { type: ADD_CARD, data }
}

export const addOther = (data) => {
    return { type: ADD_OTHER, data }
}

export const getCards = ( array ) => {
    return { type: GET_CARDS, array }
}