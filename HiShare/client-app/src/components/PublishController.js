import React, { useState } from "react";
import { CompoundButton } from 'office-ui-fabric-react/lib/Button';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import "./PublishController.css";
import Recaptcha from 'react-recaptcha';


function PublishController(props) {
    //eslint-disable-next-line
    const [recaptchaInstance, setRecaptchaInstance] = useState(null);
    const [isPublic, setIsPublic] = useState(true);

    function handleRecaptcha(token) {
        props.handleRecaptcha(token);
    }

    function handleToggle(e, checked) {
        setIsPublic(checked);
    }

    function handlePublish() {
        props.handlePublish(isPublic);
    }

    return (
        <div className="button-group">
            <Recaptcha sitekey={process.env.REACT_APP_RECAPTCHA_SITEKEY} ref={e => setRecaptchaInstance(e)} className="recaptcha" verifyCallback={handleRecaptcha} />
            <Toggle
                defaultChecked={isPublic}
                label="公开"
                onText="公开"
                offText="隐藏"
                onChange={handleToggle}
            />
            <div className="command-group">
                <CompoundButton secondaryText="匿名发布文章" primary={true} onClick={handlePublish}>
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