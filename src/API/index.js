import axios from "axios"
const token = localStorage.getItem("token");
const API = axios.create({baseURL: 'https://aware-gray-caridea.cyclic.app'});
//const API = axios.create({baseURL: 'http://localhost:5000'});
if (token) {
  console.log(token)
  API.defaults.headers.common['authorization'] = `Bearer ${token}`;
  API.defaults.headers.common['Content-Type'] = `application/json`;
}

export const getCustomAmounts = (fetchData) => API.post(`/amount/custom`,fetchData)
export const getUserDetails = (authData) => API.get(`/user/${authData.userId}`)