import axios from "axios"
const token = localStorage.getItem("token");
const API = axios.create({baseURL: 'https://aware-gray-caridea.cyclic.app'});
//const API = axios.create({baseURL: 'http://localhost:5000'});
if (token) {
  console.log(token)
  API.defaults.headers.common['authorization'] = `Bearer ${token}`;
  API.defaults.headers.common['Content-Type'] = `application/json`;
}

export const getUserDetails = () => API.get(`/user/details`)
export const postExchangeAmount = (postData) => API.patch(`/user/exchange`,postData)
export const updateProfile = (updataData) => API.patch('/user/profile',updataData)
export const updatePassword = (updateData) => API.patch('/user/password',updateData)
export const updateDetails = (updateData,variable) => API.patch(`/user/addDetails/${variable}`,updateData)
export const editDetails = (updateData,variable) => API.patch(`/user/editDetails/${variable}`,updateData)

export const getBankList = () => API.get('/amount/bankList')
export const getCustomAmounts = (fetchData) => API.post(`/amount/custom`,fetchData)
export const postAddAmounts = (postData) => API.post(`/amount/add`,postData)
export const updateAmount = (updateData,id) => API.patch(`/amount/edit/${id}`,updateData)
export const deleteAmount = (id) => API.delete(`/amount/delete/${id}`)

export const postSettleExpense = (settleData) => API.post('/settle/add',settleData)
export const deleteSettleExpense = (settleData) => API.patch('/settle/delete',settleData)

export const postMessage = (postData) => API.post(`/note/new`,postData)
export const deleteMessage = (id) => API.delete(`/note/delete/${id}`)

