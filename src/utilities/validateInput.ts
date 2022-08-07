interface ErrorsType {
    email: string;
    password: string;
    name: string,
    jobTitle: string
}


const validatePassword = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/);
const validateEmail = new RegExp(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/)

export const validate = (input: string, value: string) => {
    let errors: ErrorsType = { email: "", password: "", name: "", jobTitle: ""};
    let isValid: boolean = true;

    switch (input) {
        case "email":
            isValid = false;
            errors[input] = validateEmail.test(value) ? "" : "please enter a valid email address";
            break
        case "password":
            isValid = false;
            errors[input] = validatePassword.test(value) ? "" : "Password required minimum 8 characters, at least one letter, one number and one special character"
            break;
        case "name":
            isValid = false;
            errors[input] = value.length < 1 ? "you input is empty" : ""
            break;
        case "jobTitle":
            isValid = false;
            errors[input] = value.length < 1 ? "you input is empty" : ""
            break;
        default:
            break;
    }

    return !isValid && {...errors}
}