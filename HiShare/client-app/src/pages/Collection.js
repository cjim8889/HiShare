import React, { useState, useEffect } from "react";
import "./Collection.css";
import Api from "../utilities/Api";
import { Redirect } from "react-router-dom";
import { Text } from 'office-ui-fabric-react/lib/Text';
import CollectionArticlesList from "../components/CollectionList";
import {
    DefaultButton,
    Dialog,
    DialogFooter,
    DialogType,
    IconButton,
    PrimaryButton,
    TextField
} from 'office-ui-fabric-react';


export default function Collection(props) {
    const [accessToken, ] = useState(props.match.params.accessToken);
    const [collection, setCollection] = useState({});
    const [invalidToken, setInvalidToken] = useState(false);

    useEffect(() => {
        Api.GetCollection(accessToken).then((response) => {
            setCollection(response.data);
        }).catch((err) => {
            setInvalidToken(true);
        })
    }, [accessToken]);

    return (
        <div className="collection-wrapper">
            <Text block variant="xxLarge">
                {
                    collection.name
                }
            </Text>
            <CollectionArticlesList articles={collection.articles}/>
            <ToEditPage accessToken={collection.accessToken}/>
            {
                invalidToken ?
                    <Redirect to="/404"/>
                    : null
            }
        </div>
    )
}

function ToEditPage(props) {
    const [isHidden, setIsHidden] = useState(true);
    const [controlToken, setControlToken] = useState("");
    const [disabled, setDisabled] = useState(true);
    const [redirect, setRedirect] = useState(false);

    function handleDismiss() {
        setIsHidden(true);
    }

    function handleTextInput(e, value) {
        if (value.trim().length > 0) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }

        setControlToken(value);
    }

    function handleSubmit() {
        setRedirect(true);
    }
    function handleOpen() {
        setIsHidden(false);
    }

    return (
        <div>
            <IconButton className="collection-button-edit" onClick={handleOpen} iconProps={{ iconName: 'Add' }} title="Edit"/>
            <Dialog
                onDismiss={handleDismiss}
                hidden={isHidden}
                dialogContentProps={{
                    type: DialogType.normal,
                    title: '编辑Collection',
                }}
                modalProps={{
                    isBlocking: false,
                    styles: { main: { maxWidth: 800 } }
                }}
            >
                <TextField onChange={handleTextInput} label="Collection控制令牌 " required />
                <DialogFooter>
                    <PrimaryButton onClick={handleSubmit} disabled={disabled} text="确认" />
                    <DefaultButton onClick={handleDismiss} text="取消" />
                </DialogFooter>
            </Dialog>
            {
                redirect ?
                    <Redirect to={`/collections/${props.accessToken}/${controlToken}/edit`} />
                :null
            }
        </div>
    )
}