import axios from 'axios';
import authHeader  from './authHeader';
import  AuthService from './authService'

const baseURL = "https://reqres.in/"

const Axios = axios.create({
    baseURL,
})


Axios.interceptors.request.use( async function (config: any) {
  const userAuth: any =  localStorage.getItem('user');
  const refresh: any =  localStorage.getItem('refresh');
  const token = JSON.parse(userAuth)?.token

  if (!token) {
    const res = await AuthService.login(refresh?.email, refresh?.password)
    localStorage.setItem("user", JSON.stringify(res.data));
      config.timeout = 1000000;
    }
    return "Unauthorized User"
  }, function (err) {
  if(err.response.status === 401) {
    return Promise.reject(err);
    }
  });



export default Axios;