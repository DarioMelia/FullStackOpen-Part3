import React from "react";
const Notification = ({msg, isErr}) =>{
    let cssClass;
    if(!msg){
        return null
    }
    isErr? cssClass="error": cssClass="notification"
    return(
        <div className={cssClass}>
            {msg}
        </div>
    )
}
export default Notification;