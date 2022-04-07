import { Images } from '../commonconfig'

export default Cards = {
    "MasterCard" : {
        type:'MasterCard',
        logo: Images.MASTERCARD,
        cardNumber: 1234567891234567,
        expiryDate: "07/24",
        cvv: 572,
        cardHolder: 'Toni Kroos'
    },
    "Visa" : {
        type:'Visa',
        logo: Images.VISA,
        cardNumber: 1200543210456789,
        expiryDate: "10/23",
        cvv: 572,
        cardHolder: 'Toni Kroos'
    }
}