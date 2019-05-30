import React, { useState, useEffect } from "react";
import "./CollectionList.css";
import { List } from 'office-ui-fabric-react/lib/List';
import { Text } from 'office-ui-fabric-react/lib/Text';
import { Link as DomLink } from "react-router-dom";
import PublishedDate from "../components/PublishedDate";

export default function CollectionList(props) {
    const [articles, setArticles] = useState(props.articles);

    useEffect(() => {
        setArticles(props.articles);
    }, [props.articles]);

    function onRenderCell(article, index) {
        return (
            <div className="collection-item">
                <Text block variant="xLarge" className="collection-item-title">
                    <DomLink className="collection-item-url" to={`/articles/${article.accessToken}`}>
                        {article.title}
                    </DomLink>
                </Text>
                <PublishedDate className="collection-item-publish-date" date={article.publishedAt}/>
            </div>
        )
    }

    return (
        <List items={articles} onRenderCell={onRenderCell} />
    )
}