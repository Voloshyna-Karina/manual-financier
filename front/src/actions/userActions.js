import api from "../helpers/FetchData.js";

export const userTypes = {
    FETCH_CURRENCIES_PENDING: 'FETCH_CURRENCIES_PENDING',
    FETCH_CURRENCIES_SUCCESS: 'FETCH_CURRENCIES_SUCCESS',
    FETCH_CURRENCIES_FAILURE: 'FETCH_CURRENCIES_FAILURE',
}

export const getCurrencies = (token) => dispatch => {
    dispatch({ type: userTypes.FETCH_CURRENCIES_PENDING });

    const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
    };

    return api.get('https://yourdomain.salesdrive.me/api/currencies/', null, headers)
        .then(res => {
            dispatch({
                type: userTypes.FETCH_CURRENCIES_SUCCESS,
                payload: res.data,
            });
            return res.data;
        })
        .catch(err => {
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