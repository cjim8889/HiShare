import React from "react";
import "./CollectionList.css";
import { List } from 'office-ui-fabric-react/lib/List';
import { Text } from 'office-ui-fabric-react/lib/Text';
import { Link as DomLink } from "react-router-dom";
import PublishedDate from "../components/PublishedDate";
import { Link } from "react-router-dom";
import {Separator} from "office-ui-fabric-react";

export default function CollectionArticlesList(props) {
    function onRenderCell(article, index) {
        return (
            <div className="collection-item">
                <Text block variant="xLarge" className="collection-item-title">
                    <DomLink className="collection-item-url" to={`/articles/${article.accessToken}`}>
                        {
                            article.title ?
                                article.title.trim().length > 0 ?
                                    article.title
                                    : "未命名"
                                : "未命名"
                        }
                    </DomLink>
                </Text>
                <PublishedDate className="collection-item-publish-date" date={article.publishedAt}/>
            </div>
        )
    }

    return (
        <List items={props.articles ? props.articles : []} onRenderCell={onRenderCell} />
    )
}

export function CollectionList(props) {

    function onRenderCell(collection, index) {
        return (
            <div className="collection-list-item">
                <div className="collection-title"><Link to={`/collections/${collection.accessToken}`}>{collection.name}</Link></div>
                <PublishedDate className="collection-created-date" date={collection.createdAt} />
                <Separator className="post-separator" alignContent="center" />
            </div>
        )
    }

    return (
        <List className="collection-list-wrapper" items={props.collections ? props.collections : []} onRenderCell={onRenderCell}/>
    )
}