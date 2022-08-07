import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";

type ToastType = {
    text: string
    toastClass: string
}

const Toast = ({ text, toastClass} : ToastType) => {
    return (
        <div className={`align-items-center ${toastClass} text-white  border-0`} role="alert" aria-live="assertive" aria-atomic="true">
            <div className="d-flex">
                <div className="">
                    { text }
                </div>
                <button type="button" className="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        </div>
    )
}


export default Toast