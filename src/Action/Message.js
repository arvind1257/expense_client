import * as api from "../API";

export const PostMessage = (postData,navigate,onLoading) => async (dispatch) => {
    try {
        const { data } = await api.postMessage(postData)
        dispatch({type:"FETCH_CURRENT_USER",payload:data})
        onLoading(false)
    } catch (err) {
        onLoading(false);
            navigate("/Note", {
                state: {
                    status: err.response.status,
                    message: err.response.message,
                },
            });
    }
};

export const DeleteMessage = (id,navigate,onLoading) => async (dispatch) => {
    try {
        const { data } = await api.deleteMessage(id)
        dispatch({type:"FETCH_CURRENT_USER",payload:data})
        onLoading(false)
    } catch (err) {
        
        onLoading(false);
            navigate("/Note", {
                state: {
                    status: err.response.status,
                    message: err.response.message,
                },
            });
    }
};