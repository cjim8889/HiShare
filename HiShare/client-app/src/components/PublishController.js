import React, { useState } from "react";
import { CompoundButton } from 'office-ui-fabric-react/lib/Button';
import "./PublishController.css";
import Recaptcha from 'react-recaptcha';


function PublishController(props) {
    //eslint-disable-next-line
    const [recaptchaInstance, setRecaptchaInstance] = useState(null);

    const siteKey = "6LcW5KEUAAAAALv-3CULoySYrCK1zKmZjOo0MbAM";

    function handleRecaptcha(token) {
        console.log(token);
    }

    return (
        <div className="button-group">
            <Recaptcha sitekey={siteKey} ref={e => setRecaptchaInstance(e)} className="recaptcha" verifyCallback={handleRecaptcha} />
            <div>
                <CompoundButton secondaryText="匿名发布文章" primary={true} onClick={props.handlePublish}>
                    发布
                </CompoundButton>
                <CompoundButton secondaryText="清空文章" onClick={props.handleClear}>
                    清空
                </CompoundButton>
            </div>
        </div>
    )
}

export default PublishController;