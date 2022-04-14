export const ACTIVATE_PAYMENT = 'ACTIVATE_PAYMENT';
export const ADD_CARD = 'ADD_CARD';
export const ADD_OTHER = 'ADD_OTHER';

export const activatePayment = (pid) => {
    return { type: ACTIVATE_PAYMENT, id: pid}
}

export const addCard = (data) => {
    return { type: ADD_CARD, data }
}

export const addOther = (data) => {
    return { type: ADD_OTHER, data }
}