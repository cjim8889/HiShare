import React, { useState, useEffect } from "react";
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { TooltipHost } from 'office-ui-fabric-react/lib/Tooltip';
import { PrimaryButton } from 'office-ui-fabric-react';
import { Spinner } from 'office-ui-fabric-react/lib/Spinner';
import Recaptcha from 'react-recaptcha';
import "./CreateCollection.css";
import Api from "../utilities/Api";
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { Text } from 'office-ui-fabric-react/lib/Text';
import { getTheme, FontWeights } from 'office-ui-fabric-react/lib/Styling';
import { Label } from 'office-ui-fabric-react/lib/Label';

export default function CreateCollection(props) {

    const [showProgress, setShowProgress] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [isPublic, setIsPublic] = useState(true);
    const [title, setTitle] = useState("");
    const [recaptchaToken, setRecaptchaToken] = useState(null);
    const [error, setError] = useState("");
    const [hideDialog, setHideDialog] = useState(true);
    const [collection, setCollection] = useState({});

    function handleToggle(e, state) {
        setIsPublic(state);
    }

    function handleRecaptcha(token) {
        setRecaptchaToken(token);
    }

    function handleTextChange(e, value) {
        setTitle(value);
    }

    function handleDismissDialog() {
        setHideDialog(true);
        props.handleNew(collection);
    }


    useEffect(() => {
        if ((title.trim().length > 0) && recaptchaToken !== null)
        {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }

    }, [recaptchaToken, title]);


    function handleSubmission() {
        setShowProgress(true);
        setButtonDisabled(true);

        let collection = {
            isPublic: isPublic,
            name: title
        };

        Api.NewCollection(collection, recaptchaToken).then((response) => {
            setHideDialog(false);
            setShowProgress(false);
            setCollection(response.data);
            console.log(response);
        }).catch((err) => {
            setError("创建失败");
        });
    }
    return (
        <div className="collection-new-controller">
            <TextField label="标题" onChange={handleTextChange} required />
            <Toggle
                defaultChecked={isPublic}
                label={
                    <div>
                        公开
                        <TooltipHost content="可以被公开检索">
                            <Icon iconName="Info" />
                        </TooltipHost>
                    </div>
                }
                onChange={handleToggle}
                onText="公开"
                offText="私密"
            />
            <Recaptcha
                sitekey={process.env.REACT_APP_RECAPTCHA_SITEKEY}
                className="recaptcha"
                verifyCallback={handleRecaptcha}
                render="explicit"
                onloadCallback={() => console.log('loaded')}
            />
            <PrimaryButton
                disabled={buttonDisabled}
                text="创建"
                allowDisabledFocus={true}
                onClick={handleSubmission}
            />
            {
                error.trim().length > 0 ?
                    <MessageBar
                        messageBarType={MessageBarType.error}
                        isMultiline={false}
                        dismissButtonAriaLabel="Close"
                    >
                        {error}...
                    </MessageBar>
                    :null
            }
            {
                showProgress ?
                    <Spinner label="正在创建中..." />
                    : null
            }
            <Dialog
                hidden={hideDialog}
                onDismiss={handleDismissDialog}
                dialogContentProps={{
                    type: DialogType.normal,
                    title: '创建成功',
                    subText: '请务必确保Control Token的存储，一旦遗失不可恢复'
                }}
                modalProps={{
                    isBlocking: true,
                    styles: { main: { maxWidth: 450 } }
                }}
            >
                <DialogFooter>
                    <PrimaryButton onClick={handleDismissDialog} text="确认" />
                </DialogFooter>
            </Dialog>
        </div>
    )
}

export function CollectionInfo(props) {

    function renderDescription() {
        return (
            <Text variant="small" styles={{ root: { color: getTheme().palette.red, fontWeight: FontWeights.bold } }}>
                重要
            </Text>
        )
    }

    return (
        <div className="collection-info">
            <TextField label="Access Token" readOnly defaultValue={props.collection.accessToken} />
            {
                props.collection.controlToken ?
                    <TextField label="Control Token" onRenderDescription={renderDescription} readOnly defaultValue={props.collection.controlToken} />
                    : null
            }
            <div>
                <Label>文章数</Label>
                {
                    props.collection.articlesCount ? props.collection.articlesCount : props.collection.articles ? props.collection.articles.length : 0
                }
            </div>
        </div>
    )
}