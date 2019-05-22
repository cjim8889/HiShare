import React, { useState } from "react";
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import "./CommentInterface.css";
import Recaptcha from "react-recaptcha";
import Api from "../utilities/Api";

function CommentInterface(props) {
    const [recaptchaInstance, setRecaptchaInstance] = useState(null);
    const [recaptchaToken, setRecaptchaToken] = useState(null);
    const [commentText, setCommentText] = useState("");

    function handleRecaptcha(token) {
        setRecaptchaToken(token);
    }

    async function handleSubmission() {
        if (!recaptchaToken) {
            return;
        }

        let comment = {
            content: commentText
        };

        let response = await Api.InsertComment(comment, props.accessToken, recaptchaToken);

        recaptchaInstance.reset();

        props.onNew(response.data);
    }

    function handleTextChange(e, value) {
        setCommentText(value);
    }


    return (
        <div className="comment-interface">
            <h2>评论</h2>
            <TextField label="正文" multiline resizable={true} rows={4} onChange={handleTextChange} />
            <Recaptcha sitekey={process.env.REACT_APP_RECAPTCHA_SITEKEY} ref={e => setRecaptchaInstance(e)} className="recaptcha" verifyCallback={handleRecaptcha} />
            <PrimaryButton
                text="提交"
                onClick={handleSubmission}
            />
        </div>
    )
}

export default CommentInterface;