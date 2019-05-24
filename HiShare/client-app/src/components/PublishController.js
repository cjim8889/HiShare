import React, { useState } from "react";
import { CompoundButton } from 'office-ui-fabric-react/lib/Button';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { TooltipHost } from 'office-ui-fabric-react/lib/Tooltip';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import "./PublishController.css";
import Recaptcha from 'react-recaptcha';


function PublishController(props) {
    //eslint-disable-next-line
    const [recaptchaInstance, setRecaptchaInstance] = useState(null);
    const [isPublic, setIsPublic] = useState(true);
    const [title, setTitle] = useState(null);
    const [titleError, settE] = useState(null);

    function handleRecaptcha(token) {
        props.handleRecaptcha(token);
    }

    function handleToggle(e, checked) {
        setIsPublic(checked);
    }

    function handlePublish() {
        if (!title && isPublic) {
            settE("公开文章标题不得为空");
            return;
        }

        props.handlePublish({
            isPublic: isPublic,
            title: title
        });
    }

    function handleTitleInput(e, value) {
        setTitle(value);

        if(value) {
            settE(null);
        } else {
            settE("公开文章标题不得为空");
        }
    }


    return (
        <div className="button-group">
            <Recaptcha sitekey={process.env.REACT_APP_RECAPTCHA_SITEKEY}
                       ref={e => setRecaptchaInstance(e)}
                       className="recaptcha"
                       verifyCallback={handleRecaptcha}
                       render="explicit"
                       onloadCallback={() => console.log('loaded')}
            />
            <Toggle
                defaultChecked={isPublic}
                label={
                    <div>
                        公开
                        <TooltipHost content="可以在首页被检索">
                            <Icon iconName="Info" />
                        </TooltipHost>
                    </div>
                }
                onText="公开"
                offText="隐藏"
                onChange={handleToggle}
            />
            {
                isPublic ?
                    <TextField label="标题" required onChange={handleTitleInput} errorMessage={titleError} />
                    :null
            }
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