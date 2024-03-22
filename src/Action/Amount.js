import * as api from "../API";

export const getCustomAmounts = (fetchData, navigate, onLoading) => async (dispatch) => {
    try {
        console.log(fetchData)
        const { data } = await api.getCustomAmounts(fetchData);
        dispatch({type:"FETCH_CUSTOM_AMOUNTS",payload:data})
    } catch (err) {
            navigate("/Home", {
                state: {
                    status: err.response.status,
                    message: err.response.message,
                },
            });
    }
};