import React from "react";
import { CollectionInfo } from "../components/CreateCollection";
import Api from "../utilities/Api";
import "./EditCollection.css";
import { Text } from 'office-ui-fabric-react/lib/Text';
import { IconButton } from 'office-ui-fabric-react';
import { List } from 'office-ui-fabric-react/lib/List';
import PublishedDate from "../components/PublishedDate";

class EditCollection extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            collection: this.props.location.state ? this.props.location.state.collection : {},
            accessToken: this.props.match.params.accessToken,
            controlToken: this.props.match.params.controlToken
        };

        this.handleDelete = this.handleDelete.bind(this);
    }

    componentWillMount() {
        Api.GetCollection(this.state.accessToken).then((response) => {
            console.log(response);
            this.setState({collection: response.data});
        }).catch((err) => {
            console.log(err);
        });
    }

    handleDelete(accessToken) {
        Api.RemoveFromCollection(accessToken, this.state.controlToken).then((response) => {
            let articles = this.state.collection.articles;
            let filtered = articles.filter((value, index, arr) => {
                return value.accessToken !== accessToken;
            });

            this.setState({collection: {...this.state.collection, articles: filtered}})
        })
    }

    render() {
        return (
            <div className="collection-edit-page">
                <Text variant="xxLarge" nowrap block>编辑Collection</Text>
                {
                    Object.keys(this.state.collection).length > 0 ?
                        <CollectionInfo collection={this.state.collection} />
                        :null
                }
                {
                    Object.keys(this.state.collection).length > 0 ?
                        <EditCollectionItemList onDelete={this.handleDelete} articles={this.state.collection.articles}/>
                        : null
                }
            </div>
        );
    }
}

function EditCollectionItemList(props) {

    function onRenderCell(article, index) {
        return (
            <EditCollectionItem onDelete={props.onDelete} article={article}/>
        )
    }

    return (
        <List items={props.articles} onRenderCell={onRenderCell} />
    )
}

function EditCollectionItem(props) {


    function handleDelete() {
        props.onDelete(props.article.accessToken);
    }

    return (
        <div className="collection-edit-item">
            <Text variant="xLarge" className="collection-edit-item-title">
                {
                    props.article.title.length < 30 ?
                        props.article.title
                        :props.article.title.substr(0, 27) + "..."
                }
            </Text>
            <PublishedDate className="collection-edit-item-date" date={props.article.publishedAt}/>
            <IconButton onClick={handleDelete} className="collection-edit-item-delete" iconProps={{ iconName: 'Cancel' }} title="Delete" ariaLabel="Delete" />
        </div>
    )
}

export default EditCollection;