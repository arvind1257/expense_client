import * as api from "../API";
import axios from "axios";
import { logout } from "./Logout";
import { getCustomAmounts } from "./Amount";

export const logIn = (authData, navigate, onLoading) => async (dispatch) => {
    try {
        const { data } = await axios.post(
            "https://expense-server-oc1v.onrender.com/user/login",
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

export const getUserDetails = (navigate) => async (dispatch) => {
    try {
        const { data } = await api.getUserDetails();
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

export const postExchangeAmount = (postData,fetchData,navigate,onLoading) => async (dispatch) => {
    try {
        const { data } = await api.postExchangeAmount(postData);
        dispatch({type:"FETCH_CURRENT_USER",payload:data})
        dispatch(getCustomAmounts(fetchData,navigate,onLoading))
        onLoading(false)
    } catch (err) {
            navigate("/Home", {
                state: {
                    status: err.response.status,
                    message: err.response.message,
                },
            });
    }
};

export const updateProfile = (updataData,navigate,onLoading) => async(dispatch) => {
    try{
        const {data} = await api.updateProfile(updataData)
        dispatch({type:"FETCH_CURRENT_USER",payload:data})
        onLoading(false)
        alert("Successfully Updated")
    }catch(err){
        navigate("/Settings",{
            state:{
                status:err.response.status,
                message:err.response.message
            }
        })
    }
}

export const updatePassword = (updataData,navigate,onLoading) => async(dispatch) => {
    try{
        const {data} = await api.updatePassword(updataData)
        dispatch({type:"FETCH_CURRENT_USER",payload:data})
        onLoading(false)
        alert("Successfully Updated")
    }catch(err){
        navigate("/Settings",{
            state:{
                status:err.response.status,
                message:err.response.message
            }
        })
    }
}

export const updateDetails = (updataData,variable,navigate,onLoading) => async(dispatch) => {
    try{
        const {data} = await api.updateDetails(updataData,variable)
        dispatch({type:"FETCH_CURRENT_USER",payload:data})
        onLoading(false)
        alert("Successfully Updated")
    }catch(err){
        navigate("/Settings",{
            state:{
                status:err.response.status,
                message:err.response.message
            }
        })
    }
}

export const editDetails = (updataData,variable,navigate,onLoading) => async(dispatch) => {
    try{
        const {data} = await api.editDetails(updataData,variable)
        dispatch({type:"FETCH_CURRENT_USER",payload:data})
        onLoading(false)
        alert("Successfully Updated")
    }catch(err){
        navigate("/Settings",{
            state:{
                status:err.response.status,
                message:err.response.message
            }
        })
    }
}