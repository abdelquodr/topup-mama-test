import Axios from './axiosConfig'
import authHeader from './authHeader'

// interface AuthHeaderType {
//   token: string
// }


const API_URL = "https://reqres.in/";
class AuthService {

  // login
  login(email: string, password: string) {
    return Axios
      .post(API_URL + "api/login", {
        email,
        password
      })
      .then((response: { data: { token: any; }; }) => {
        const user = localStorage.getItem("user");
        localStorage.setItem("refresh", JSON.stringify({ email, password }));
        if (response && user) {
          return response.data.token === JSON.parse(user).token ? "Successful" : "failed"
        }
      })
      .catch((err: any) => {
        return err
      })
  }

  // logout
  logout() {
    localStorage.removeItem("user");
  }

  // register
  register(email: string, password: string) {
    return Axios.post(API_URL + "api/register", {
      email,
      password
    })
    .then((res: { data: { token: any; }; }) => {
      if (res.data.token) {
        localStorage.setItem("user", JSON.stringify(res.data));
      }
      return res
    })
    .catch((err: any) => {
      return err
    })

  }

  // create user
  createUser(name: string, job: string) {
    const { token } = this.getCurrentUser()
    if(!token)  return "Unauthorized User"
    return Axios.post(API_URL + "api/users",{
      name,
      job
    }).then( (res: any) => (res))
    .catch((err: any) => {
      return err
    })
  }

  // get all users
  getUsers(pageNumber: number){

    return Axios.get(API_URL + `api/users?page=${pageNumber}`,{
      headers: authHeader()
    }).then((res: any) => res)
    .catch((err: any) =>  err)
  }

  // update user
  updateUser(name: string, job: string, id: number)  {
    return Axios.patch(API_URL + `api/users/${id}`, { name, job},{
      headers: authHeader() }
     ).then( (res: { data: any; }) => res.data)
    .catch((err: any) => {
      return err
    })
  }

  //delete User
  deleteUser(id: number) {
    return Axios.delete(API_URL + `api/users/${id}`, { headers: authHeader()})
    .then( (res: { data: any; }) => res.data)
    .catch((err: any) => {
      return err
    })
  }

  // get current user
  getCurrentUser() {
    const userStr = localStorage.getItem("user");
    if (userStr) return JSON.parse(userStr);
    return null;
  }
}

export default new AuthService()