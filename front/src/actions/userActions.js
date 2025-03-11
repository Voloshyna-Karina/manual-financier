import api from "../helpers/FetchData.js";
import axios from "axios";

export const userTypes = {
    FETCH_CURRENCIES_PENDING: 'FETCH_CURRENCIES_PENDING',
    FETCH_CURRENCIES_SUCCESS: 'FETCH_CURRENCIES_SUCCESS',
    FETCH_CURRENCIES_FAILURE: 'FETCH_CURRENCIES_FAILURE',
}

export const getCurrencies = () => (dispatch) => {
    dispatch({ type: userTypes.FETCH_CURRENCIES_PENDING });

    axios.get('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5')
        .then((res) => {
            dispatch({
                type: userTypes.FETCH_CURRENCIES_SUCCESS,
                payload: res.data,
            });
            return res.data;
        })
        .catch((err) => {
            dispatch({
                type: userTypes.FETCH_CURRENCIES_FAILURE,
                payload: {
                    status: err.response?.status,
                    message: err.message,
                },
            });
            throw err;
        });
};