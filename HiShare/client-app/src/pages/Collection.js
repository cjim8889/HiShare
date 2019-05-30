import React, { useState, useEffect } from "react";
import "./Collection.css";
import Api from "../utilities/Api";
import { Redirect } from "react-router-dom";
import { Text } from 'office-ui-fabric-react/lib/Text';
import CollectionList from "../components/CollectionList";
import { IconButton } from 'office-ui-fabric-react';


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
            <CollectionList articles={collection.articles}/>
            <IconButton iconProps={{ iconName: 'Add' }} title="Edit"/>
            {
                invalidToken ?
                    <Redirect to="/404"/>
                    : null
            }
        </div>
    )
}