import React, { useState } from "react";

const loginPage = ({value,onLoginClick}) => {
    console.log(onLoginClick);
    return(
    <div>
        <button onClick={onLoginClick}>Connect</button>
        <div>Account: {value}</div>
    </div>
)}

export default loginPage