import * as api from "../API";

export const getCustomAmounts = (fetchData, navigate, onLoading) => async (dispatch) => {
    try {
        console.log(fetchData)
        const { data } = await api.getCustomAmounts(fetchData)
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

export const postAddAmounts = (postData,fetchData,navigate,onLoading) => async (dispatch) => {
    try {
        console.log(postData)
        const { data } = await api.postAddAmounts(postData)
        dispatch({type:"FETCH_CURRENT_USER",payload:data})
        dispatch(getCustomAmounts(fetchData,navigate,onLoading))
        navigate('/Home')
    } catch (err) {
            navigate("/Home", {
                state: {
                    status: err.response.status,
                    message: err.response.message,
                },
            });
    }
};

export const updateAmount = (updateData,id,fetchData,navigate,onLoading) => async (dispatch) => {
    try {
        console.log(updateData)
        const { data } = await api.updateAmount(updateData,id)
        dispatch({type:"FETCH_CURRENT_USER",payload:data})
        dispatch(getCustomAmounts(fetchData,navigate,onLoading))
        navigate('/Home')
    } catch (err) {
            navigate("/Home", {
                state: {
                    status: err.response.status,
                    message: err.response.message,
                },
            });
    }
};

export const deleteAmount = (id,fetchData,navigate,onLoading) => async (dispatch) => {
    try {
        console.log(id)
        const { data } = await api.deleteAmount(id)
        dispatch({type:"FETCH_CURRENT_USER",payload:data})
        dispatch(getCustomAmounts(fetchData,navigate,onLoading))
        navigate('/Home')
    } catch (err) {
            navigate("/Home", {
                state: {
                    status: err.response.status,
                    message: err.response.message,
                },
            });
    }
};