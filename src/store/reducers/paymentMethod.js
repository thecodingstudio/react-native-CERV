import { ACTIVATE_PAYMENT, ADD_CARD, ADD_OTHER } from "../actions/paymentMethod";
import { Images } from "../../commonconfig";

const initialState = {
    paymentMethods: [],
    activeMethodID: 0
}

export default (state = initialState, action ) => {
    switch(action.type) {
        case ACTIVATE_PAYMENT:
            const pid = action.id
            return {
                ...state,
                activeMethodID: pid
            }
        case ADD_CARD:
            const data = action.data

            const cardNumber = data.cardNumber
            const expiryDate = data.expiryDate
            const cvv = data.cvv
            const name = data.name
            const paymentType = data.paymentType
            const cImage = Images.CREDIT_CARD
            const idC = state.paymentMethods.length

            const cardObj = {
                pid: idC,
                logo: cImage,
                cardNumber: cardNumber,
                expiryDate: expiryDate,
                cvv: cvv,
                name: name,
                paymentType: paymentType,
            }
            
            const tempArrayC = state.paymentMethods
            tempArrayC.push(cardObj)

            return {
                ...state,
                paymentMethods: tempArrayC
            }

        case ADD_OTHER:
            const otherData = action.data

            const otherID = otherData.id
            const type = otherData.type === 'gpay' ? 'Google Pay' : 'Apple Pay'
            const image = otherData.type === 'gpay' ? Images.GOOGLE_PAY : Images.APPLE_PAY
            const idO = state.paymentMethods.length

            const otherObj = {
                pid: idO,
                id: otherID,
                type: type,
                logo: image
            }

            const tempArrayO = state.paymentMethods
            tempArrayO.push(otherObj)

            return {
                ...state,
                paymentMethods: tempArrayO
            }

        default:
            return state;
    }
}