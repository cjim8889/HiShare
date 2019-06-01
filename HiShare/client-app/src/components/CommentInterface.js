import React, { useState, useEffect } from "react";
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { Text } from 'office-ui-fabric-react/lib/Text';
import "./CommentInterface.css";
import Recaptcha from "react-recaptcha";
import Api from "../utilities/Api";

function CommentInterface(props) {
    const [recaptchaInstance, setRecaptchaInstance] = useState(null);
    const [recaptchaToken, setRecaptchaToken] = useState("");
    const [commentText, setCommentText] = useState("");
    const [disabled, setDisabled] = useState(true);

    function handleRecaptcha(token) {
        setRecaptchaToken(token);
    }

    useEffect(() => {
        if (recaptchaToken.trim().length > 0 && commentText.trim().length > 0) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [recaptchaToken, commentText]);



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
            <Text block variant="xxLarge" as="h1">评论</Text>
            <TextField label="正文" multiline resizable={true} rows={4} onChange={handleTextChange} />
            <Recaptcha sitekey={process.env.REACT_APP_RECAPTCHA_SITEKEY}
                       ref={e => setRecaptchaInstance(e)}
                       className="recaptcha"
                       verifyCallback={handleRecaptcha}
                       render="explicit"
                       onloadCallback={() => console.log('loaded')}
            />
            <PrimaryButton
                disabled={disabled}
                text="提交"
                onClick={handleSubmission}
            />
        </div>
    )
}

export default CommentInterface;