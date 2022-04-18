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

        // 0 placed, 1 accepted, 2 preparing, 3 dispatched , 4 delivered
        // orderStage 

        // 0 pending , 1 completed, 2 rejected , 3 cancelled
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
                orderPlaceTime: new Date().toLocaleTimeString( [] , { hour12: true, hour:"2-digit", minute:"2-digit" } ),
                orderType: data.orderType,
                discountAmount: data.discountAmount,
                totalAmount: data.totalAmount,
                address: data.address,
                orderStage : 0,
                orderStatus : 0
            }
            
            const tempOrders = []
            const tempCurrentOrders = []

            tempOrders[oID] = orderObj
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
                orderStatus: 3
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