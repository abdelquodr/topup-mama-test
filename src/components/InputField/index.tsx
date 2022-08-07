import { useState } from "react"
import {HandleInputType, InputStateType } from "../../App"
import { validate } from "../../utilities/validateInput"

type InputFieldProps = {
    name: string,
    title: string,
    type: string,
    value: string,
    required: boolean
    handleInputChange: ({name, value}: HandleInputType) => void,
}


const InputField = ({name, title, type, value, handleInputChange}: InputFieldProps ): JSX.Element => {
    // state
    const [ hasError, setHasError ] = useState<InputStateType>({
      email: "",
      password: "",
      name: "",
      jobTitle: ""
    })

  // handler
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    const isError = validate(name, value)
    setHasError((prev) => ({...prev, ...isError}))
    handleInputChange({name, value});
  }

  return (
    <div className="col-12 col-lg-6 mb-3 form-group">
      <label className="col-sm-12 col-md-3 col-lg-3 mb-1 px-0 mx-0 font-weight-800 control"htmlFor="email">{ title }</label>
      <input
        type={ type }
        name={ name }
        value={ value }
        className="form-control col-sm-12 col-md-9 col-lg-9 my-2 py-3 "
        placeholder={`Enter ${name}`}
        onChange={ handleOnChange } />
        <small className="text-danger font-weight-bold">
          { hasError[name as keyof typeof hasError]?.length > 1 && hasError[name as keyof typeof hasError] }
        </small>
    </div>
    );
  }

  export default InputField;