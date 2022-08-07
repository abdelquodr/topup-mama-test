import React, { useState } from 'react'
import AuthService from '../utilities/authService'
import { InputField, Button } from "../components"
import { useNavigate } from "react-router-dom";

export type InputStateType = { email: string, password: string};
export type HandleInputType = { name: string, value: string }


const Register = () => {
  // state
  const [ inputState, setInputState] = useState<InputStateType>({
    email: "",
    password: "",
  });
  const [ notify, setNotify] = useState("")
  const navigate = useNavigate()

  // handlers
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { email, password } = inputState;
    const response = await AuthService.register(email, password)
    console.log(response, "from register");
    if(response?.status === 200){
      navigate('/login');
      return
    }if(response.message  === "Network Error"){
      setNotify("Check your Network")
    }
    setNotify("Note: Only defined users succeed registration")

  }

  const handleOnChange = ({name, value}: HandleInputType) => {
     setInputState(prev => ({...prev, [name]: value}));
  }


  return (
    <div className="mt-5">
      <form className="m-auto w-75" onSubmit={handleSubmit}>
        <InputField name="email" title="EMAIL ADDRESS" type="text" value={inputState.email} handleInputChange={handleOnChange} required={ true }/>
        <InputField name="password" title="PASSWORD" type="text" value={inputState.password} handleInputChange={handleOnChange} required={ true }/>
        <Button text="Submit" buttonClass="btn-primary btn-lg btn-block px-5" />
      </form>

      { notify.length > 0 && <p className="text-warning text-center">{notify}</p>}
    </div>
  )
}

export default Register