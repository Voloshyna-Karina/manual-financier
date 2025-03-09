
export const formTypes = {
    UPDATE_FORM_DATA: 'UPDATE_FORM_DATA',
}

export const updateFormData = (data) => {
    return (dispatch) => {
        dispatch({
            type: formTypes.UPDATE_FORM_DATA,
            payload: data,
        });
    };
};
