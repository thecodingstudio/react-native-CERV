export const ACTIVATE_PAYMENT = 'ACTIVATE_PAYMENT'

export const activatePayment = (pid) => {
    return { type: ACTIVATE_PAYMENT, id: pid}
}