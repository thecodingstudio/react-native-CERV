import { Alert } from "react-native";
import { postRequest } from "../../helpers/ApiHelpers";

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export const logOut = () => {
    return { type: LOGOUT }
}