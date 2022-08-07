import React, { useState}  from 'react'
import { InputField, Button } from "../components"
import Toast from '../components/Toast';
import AuthService from "../utilities/authService"
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import { getLocation } from '../utilities/location';
import { validate } from '../utilities/validateInput';
import { useCountdown } from "../utilities/useCountDown"

export type InputStateType = { name: string, jobTitle: string};
export type HandleInputType = { name: string, value: string }


const Dashboard  = () => {
    // state
    const [ inputState, setInputState] = useState<InputStateType>({
        name: "",
        jobTitle: "",
      });

    const [ userIsCreated, setUserIsCreated ] = useState(false)
    const [ userIsDeleted, setUserIsDeleted ] = useState(false)
    const count = useCountdown(10, 0)
    const [ updateWith, setUpdateWith ] = useState("")
    const [ locate, setLocate ] = useState("")
    const { id } = AuthService.getCurrentUser() !== null && AuthService.getCurrentUser()


      // handlers
      const handleOnChange = ({name, value}: HandleInputType) => {
        validate(name, value)
        setInputState(prev => ({...prev, [name]: value}));
        if( value.length > 0 ){
          setUpdateWith("")
          return
        }
     }

      const handleOnUpdate = async() => {
        const { name, jobTitle } = inputState;
          if(name === "" || jobTitle === ""){
            setUpdateWith("fill the Input above")
            return
          }
          const response = await AuthService.updateUser(name, jobTitle, id)
          console.log(response);
          if( response.status === 201) {
            setUserIsCreated( true );
          }
      }

      const handleOnDelete = async() => {
          const response = await AuthService.deleteUser( id)
          console.log(response, "from delete")
      }

      const handleOnLogOut = () => {
          AuthService.logout()
      }

      const location = getLocation()
      location.then(res => setLocate(res.data.country + " " + res.data.city))


    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
            <ul className="navbar-nav me-auto my-2 my-lg-0">
              <li className="nav-item mx-2">
               <button type="button" className="nav-link btn btn-warning px-3" aria-current="page">Your location is {locate ? locate : "loading ..."} </button>
              </li>
              <li className="nav-item mx-2">
                <button type="button" className="btn btn-primary px-4 py-2" data-bs-toggle="modal" data-bs-target="#exampleModal">
                  User
                </button>
              </li>
              <li className="nav-item mx-2">
                <button type="button" className="nav-link btn btn-danger px-3" aria-current="page" onClick={ handleOnLogOut }>Logout</button>
              </li>
              <li className="nav-item mx-2">
                <button type="button" className="nav-link btn btn-danger px-3 text-light" aria-current="page" >Timer {count}</button>
              </li>
              { userIsCreated && <Toast  text="User Created Successfully" toastClass="bg-success" /> }
             </ul>


              {/* modal */}
              <form>
                <div className="modal fade" id="exampleModal"  aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">capture user details</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div className="modal-body">
                        <InputField name="name" title="Name" type="text" value={inputState.name} handleInputChange={handleOnChange} required={ true }/>
                        <InputField name="jobTitle" title="Job Type" type="text" value={inputState.jobTitle} handleInputChange={handleOnChange} required={ true }/>
                      </div>
                      <div className="modal-footer">
                        <Button type="button" text="delete" buttonClass="btn btn-danger" data-bs-dismiss="modal" onClick={handleOnDelete} />
                        <Button type="button" text="Save" buttonClass="btn btn-primary" onClick={ handleOnUpdate } />
                      </div>
                      { updateWith.length > 0 ? <p className="text-center text-danger">{ updateWith }</p> : "" }

                    </div>
                  </div>
                </div>
              </form>
          </div>
        </nav>
    )
}


export default Dashboard