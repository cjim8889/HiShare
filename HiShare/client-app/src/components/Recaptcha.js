import React from "react";

export const loadRecaptchaScript = siteKey => {
    let ele = document.createElement("script");

    ele.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;

    document.body.append(ele);
};

function Recaptcha(props) {
    return (
        <div>
            <h1>dsofkp</h1>
        </div>
    )
}



export default Recaptcha;
