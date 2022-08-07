
type ButtonProps = {
    text: string,
    buttonClass: string,
    type?: "submit" | "reset" | "button" | undefined,
    onClick?: () => void, 
}



const Button = ({text, buttonClass, type, ...props}: ButtonProps): JSX.Element => {
    return (
      <div className="form-group">
        <button className={`btn mt-2 ${buttonClass}`} type={type} {...props} >
          { text }
        </button>
      </div>
    );
  }

  export default Button;