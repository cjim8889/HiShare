import React, { useState } from "react";
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import "./CommentInterface.css";
import Recaptcha from "react-recaptcha";

function CommentInterface(props) {
    const [recaptchaInstance, setRecaptchaInstance] = useState(null);
    const [rcCheckbox, setRcCheckbox] = useState(false);
    const siteKey = "6Ld8y6QUAAAAAPXUTHqavk0zyzEcCKbpu2QLlBLi";

    //TODO: implement the logic
    function handleRecaptcha(token) {
        console.log(token);
        setRcCheckbox(true);
    }

    function handleSubmission() {

    }


    function handleRecaptchaCheckbox(e, isChecked) {
        if (isChecked) {
            console.log("clicked");
            recaptchaInstance.execute();
        }
    }

    return (
        <div className="comment-interface">
            <h2>评论</h2>
            <TextField label="正文" multiline resizable={true} rows={4} />
            <Checkbox label="不是机器人" checked={rcCheckbox} onChange={handleRecaptchaCheckbox}/>
            <PrimaryButton
                text="提交"
                onClick={handleSubmission}
            />
            <Recaptcha sitekey={siteKey} size="invisible" ref={e => setRecaptchaInstance(e)} className="recaptcha" verifyCallback={handleRecaptcha} />

        </div>
    )
}

export default CommentInterface;