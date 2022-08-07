import axios from "axios"

export default function authHeader() {
  const userStr = localStorage.getItem("user");
  let user = null;
  if (userStr)
    user = JSON.parse(userStr);
  if (user && user.token) {
    return { Authorization: 'Bearer ' + user.token };
  } else {
    return { Authorization: '' };
  }
}


let refresh =  false;

axios.interceptors.response.use(res => res, async err => {
  console.log(err.response);
  if(err.response.status === 401 && !refresh) {
      const response = await axios.post('/refresh', {}, {withCredentials: true})

      if(response.status === 200){
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data['token']

        return axios(err.config)
      }
  }
  refresh = false;
  return err
})
