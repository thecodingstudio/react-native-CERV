export const ADD_ADDRESS = 'ADD_ADDRESS'
export const ACTIVATE_ADDRESS = 'ACTIVATE_ADDRESS'

export const addAddress = ( addressObj ) => {
    return { type: ADD_ADDRESS, tag: addressObj.tag , address: addressObj.address, icon: addressObj.icon }
}

export const activateAddress = (id) => {
    return { type: ACTIVATE_ADDRESS, id: id } 
}