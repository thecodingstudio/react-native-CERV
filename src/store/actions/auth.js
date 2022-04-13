import { Alert } from "react-native";
import { postRequest } from "../../helpers/ApiHelpers";

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

// export const login = (data) => {
//     const email = data.email;
//     const password = data.password;
//     return async dispatch => {
//         const response = await fetch(
//             'https://cerv-api.herokuapp.com/users/login',
//             {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({
//                     email: email,
//                     password: password,
//                 })
//             }
//         )
//         const resData = await response.json();
//         if (!response.ok) {
//             let errorMsg = 'Something went wrong!';
//             if (resData.error === 'User does not exist!') {
//                 errorMsg = " User does not exist! ";
//             } else if (resData.error === 'Invalid Password!') {
//                 errorMsg = "Password is incorrect."
//             }
//             Alert.alert("Error", errorMsg, [{ text: "Okay" }])
//         } else {
//             dispatch({ type: LOGIN, token: resData.token, id: resData.user.id, refreshToken: resData.refreshToken })
//         }
//     }
// }
// export const login = async(values) => {
//     const data = {
//         email: values.email,
//         password: values.password
//     };
//     const response = await postRequest('/users/login', data);
//     const resData = response.data;
//     let errorMsg = 'Something went wrong!';
//     if (response.success) {
//         dispatch({ type: LOGIN, token: resData.token, id: resData.user.id, refreshToken: resData.refreshToken })
//     } else {
//         if (resData.error === 'User does not exist!') {
//             errorMsg = " User does not exist! ";
//         } else if (resData.error === 'Invalid Password!') {
//             errorMsg = "Password is incorrect."
//         }
//         Alert.alert("Error!", errorMsg, [{text: "Okay"}]);
//     }
// }

export const logOut = () => {
    return { type: LOGOUT }
}