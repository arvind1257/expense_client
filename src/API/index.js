import axios from "axios"
const API = axios.create({baseURL: 'https://expense-server-oc1v.onrender.com'});
//const API = axios.create({baseURL: 'http://localhost:5000'});

const Initalialize = () =>{
  const token = localStorage.getItem("token");
  API.defaults.headers.common['authorization'] = `Bearer ${token}`;
  API.defaults.headers.common['Content-Type'] = `application/json`;
}

export const getUserDetails = () => { Initalialize(); return API.get(`/user/details`);}
export const postExchangeAmount = (postData) => { Initalialize(); return API.patch(`/user/exchange`,postData)}
export const updateProfile = (updataData) => { Initalialize(); return API.patch('/user/profile',updataData)}
export const updatePassword = (updateData) => { Initalialize(); return API.patch('/user/password',updateData)}
export const updateDetails = (updateData,variable) => { Initalialize(); return API.patch(`/user/addDetails/${variable}`,updateData)}
export const editDetails = (updateData,variable) => { Initalialize(); return API.patch(`/user/editDetails/${variable}`,updateData)}

export const getBankList = () => { Initalialize(); return API.get('/amount/bankList')}
export const getCustomAmounts = (fetchData) =>{ Initalialize(); return API.post(`/amount/custom`,fetchData)}
export const postAddAmounts = (postData) =>{ Initalialize(); return API.post(`/amount/add`,postData)}
export const updateAmount = (updateData,id) =>{ Initalialize(); return API.patch(`/amount/edit/${id}`,updateData)}
export const deleteAmount = (id) =>{ Initalialize(); return API.delete(`/amount/delete/${id}`)}

export const postSettleExpense = (settleData) =>{ Initalialize(); return API.post('/settle/add',settleData)}
export const deleteSettleExpense = (settleData) =>{ Initalialize(); return API.patch('/settle/delete',settleData)}

export const postMessage = (postData) => { Initalialize();return API.post(`/note/new`,postData)}
export const deleteMessage = (id) => { Initalialize();return API.delete(`/note/delete/${id}`)}

