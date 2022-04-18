export const PLACE_ORDER = 'PLACE_ORDER'
export const SET_DATE = 'SET_DATE'
export const SET_TIME = 'SET_TIME'
export const CANCEL_ORDER = 'CANCEL_ORDER'

export const placeOrder = (data) => {
    return { type : PLACE_ORDER, data }
}

export const setDate = (str) => {
    return { type : SET_DATE, str }
}

export const setTime = (str) => {
    return { type : SET_TIME, str }
}

export const cancelOrder = (id) => {
    return { type: CANCEL_ORDER, id }
}