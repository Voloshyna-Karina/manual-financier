import axios from 'axios';

export const userTypes = {
    FETCH_CURRENCIES_PENDING: 'FETCH_CURRENCIES_PENDING',
    FETCH_CURRENCIES_SUCCESS: 'FETCH_CURRENCIES_SUCCESS',
    FETCH_CURRENCIES_FAILURE: 'FETCH_CURRENCIES_FAILURE',
};

export const getCurrencies = () => (dispatch) => {
    dispatch({ type: userTypes.FETCH_CURRENCIES_PENDING });

    return axios.get('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json')
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