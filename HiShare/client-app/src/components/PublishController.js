import React, { useState } from "react";
import { CompoundButton } from 'office-ui-fabric-react/lib/Button';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { TooltipHost } from 'office-ui-fabric-react/lib/Tooltip';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import "./PublishController.css";
import Recaptcha from 'react-recaptcha';


function PublishController(props) {
    const [isPublic, setIsPublic] = useState(true);
    const [disabled, setDisabled] = useState(true);

    function handleRecaptcha(token) {
        setDisabled(false);
        props.handleRecaptcha(token);
    }

    function handleToggle(e, checked) {
        setIsPublic(checked);
    }

    function handlePublish() {
        props.handlePublish({
            isPublic: isPublic
        });
    }




    return (
        <div className="button-group">
            <Recaptcha sitekey={process.env.REACT_APP_RECAPTCHA_SITEKEY}
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
                offText="私密"
                onChange={handleToggle}
            />
            <div className="command-group">
                <CompoundButton disabled={disabled} secondaryText="匿名发布文章" primary={true} onClick={handlePublish}>
                    发布
                </CompoundButton>
                <CompoundButton secondaryText="清空文章" onClick={props.handleClear}>
                    清空
                </CompoundButton>
                <CompoundButton secondaryText="保存草稿" onClick={props.handleSave}>
                    保存
                </CompoundButton>
            </div>
        </div>
    )
}

export default PublishController;