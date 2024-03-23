import * as api from "../API";
import axios from "axios";
import { logout } from "./Logout";

export const logIn = (authData, navigate, onLoading) => async (dispatch) => {
    try {
        const { data } = await axios.post(
            "https://aware-gray-caridea.cyclic.app/user/login",
            authData
        );
        // const { data } = await axios.post(
        //     "http://localhost:5000/user/login",
        //     authData
        // );

        if (data) {
            console.log(data.result)
            localStorage.setItem("token", data.token);
            localStorage.setItem("id", data.result._id);
            dispatch({type:"FETCH_CURRENT_USER",payload:data.result})
            navigate("/Home");
        }
    } catch (err) {
        if (err.response)
            navigate("/", {
                state: {
                    status: err.response.status,
                    message: err.response.data.message,
                },
            });
        else dispatch(logout());
    }
};

export const getUserDetails = (authData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.getUserDetails(authData);
        dispatch({type:"FETCH_CURRENT_USER",payload:data})
    } catch (err) {
            navigate("/Home", {
                state: {
                    status: err.response.status,
                    message: err.response.message,
                },
            });
    }
};