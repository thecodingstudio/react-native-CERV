import { CANCEL_ORDER, PLACE_ORDER, SET_DATE, SET_TIME } from "../actions/order"

const initialState = {
    // All Order Lists
        //all orders
        orders: [],

        // pending orderStatus 
        currentOrders: [], 

        // completed/rejected orderStatus
        pastOrders :[],

        // required data
        deliveryDate : '',
        deliveryTime : '',

    //Order Object 
    
        // orderId 
        // catererId
        // items 
        // orderType
        // discountAmount
        // totalAmount 
        // address 

        // 0 = order_placed, 1 = caterer_accepted, 2 = preparing_food, 3= dispachted, 4 = delivered, 5 = cancelled, 6 = rejected
        // orderStatus
}

export default ( state = initialState , action ) => {
    switch(action.type) {
        case SET_DATE:
            const dateString = action.str
            return {
                ...state,
                deliveryDate: dateString
            }

        case SET_TIME:
            const timeString = action.str
            return {
                ...state,
                deliveryTime: timeString
            }

        case PLACE_ORDER: 
            const data = action.data
            const oID = state.orders.length

            const orderObj = {
                orderID: oID,
                catererId : data.catererId,
                items : data.items,
                deliveryDate: state.deliveryDate,
                deliveryTime: state.deliveryTime,
                orderPlaceDate: new Date().toLocaleDateString(),
                orderPlaceTime: new Date().toLocaleTimeString(),
                orderType: data.orderType,
                discountAmount: data.discountAmount,
                totalAmount: data.totalAmount,
                address: data.address,
                orderStatus : 0
            }

            const tempOrders = [...state.orders]
            tempOrders[oID] = orderObj

            const tempCurrentOrders = [...state.currentOrders]
            tempCurrentOrders[oID] = orderObj

            return {
                ...state,
                orders: tempOrders,
                currentOrders: tempCurrentOrders
            }
        
        case CANCEL_ORDER:
            const id = action.id

            let cancelOrderObj = state.orders[id]
            //console.log(cancelOrderObj)

            const tempoCurrentOrders = state.currentOrders
            delete tempoCurrentOrders[id]

            const tempPastOrders = state.pastOrders
            cancelOrderObj = {
                ...cancelOrderObj,
                orderStatus: 5
            }

            tempPastOrders[id] = cancelOrderObj

            return {
                ...state,
                currentOrders: tempoCurrentOrders,
                pastOrders: tempPastOrders
            }

        default:
            return state;
    }
}