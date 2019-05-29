import React, { useState, useEffect } from "react";
import { CollectionInfo } from "../components/CreateCollection";
import Api from "../utilities/Api";
import "./EditCollection.css";
import { Text } from 'office-ui-fabric-react/lib/Text';
import { IconButton, PrimaryButton, DefaultButton } from 'office-ui-fabric-react';
import { List } from 'office-ui-fabric-react/lib/List';
import PublishedDate from "../components/PublishedDate";
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { TextField } from 'office-ui-fabric-react/lib/TextField';

class EditCollection extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            collection: this.props.location.state ? this.props.location.state.collection : {},
            accessToken: this.props.match.params.accessToken,
            controlToken: this.props.match.params.controlToken,
            dialogHidden: true
        };

        this.handleDelete = this.handleDelete.bind(this);
        this.handleNewArticle = this.handleNewArticle.bind(this);
    }

    componentWillMount() {
        Api.GetCollection(this.state.accessToken).then((response) => {
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

    handleNewArticle(accessToken) {
        Api.InsertArticleToCollection(accessToken, this.state.controlToken).then((response) => {
            let articleDTO = response.data;
            let articles = this.state.collection.articles;

            let filtered = articles.filter((value, index, arr) => {
                return value.accessToken !== articleDTO.accessToken;
            });

            this.setState({
                collection: {...this.state.collection, articles: [...filtered, articleDTO]}
            }, () => {
                this.setState({dialogHidden: true});
            });
        }).catch((err) => {
            this.setState({dialogHidden: true});
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
                        <div className="collection-edit-control">
                            <PrimaryButton
                                text="加入文章"
                                iconProps={{ iconName: 'Add' }}
                                onClick={() => {this.setState({dialogHidden: false})}}
                            />
                        </div>
                        :null
                }
                {
                    Object.keys(this.state.collection).length > 0 ?
                        <EditCollectionItemList onDelete={this.handleDelete} articles={this.state.collection.articles}/>
                        : null
                }
                <EditCollectionNewArticle onSubmit={this.handleNewArticle} isHidden={this.state.dialogHidden} onCancel={() => { this.setState({dialogHidden : true})}} />
            </div>
        );
    }
}

function EditCollectionNewArticle(props) {
    const [accessToken, setAccessToken] = useState("");
    const [disabled, setDisabled] = useState(true);

    function handleTextInput(e, value) {
        setAccessToken(value);
    }

    useEffect(() => {
        if (accessToken.trim().length > 0) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [accessToken]);

    function handleSubmit() {
        props.onSubmit(accessToken);
    }

    return (
        <Dialog
            hidden={props.isHidden}
            dialogContentProps={{
                type: DialogType.normal,
                title: '新增文章',
            }}
            modalProps={{
                isBlocking: false,
                styles: { main: { maxWidth: 800 } }
            }}
        >
            <TextField onChange={handleTextInput} label="文章访问令牌 " required />
            <DialogFooter>
                <PrimaryButton onClick={handleSubmit} disabled={disabled} text="确认" />
                <DefaultButton onClick={props.onCancel} text="取消" />
            </DialogFooter>
        </Dialog>
    )
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