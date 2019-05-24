import React from "react";
import "./PostList.css";
import { Link } from "react-router-dom";
import { List } from 'office-ui-fabric-react/lib/List';
import { Separator } from 'office-ui-fabric-react/lib/Separator';
import PublishedDate from "../components/PublishedDate";
import {Icon} from "office-ui-fabric-react";

function PostItem(props) {
    console.log(props.article);
    return (
        <div className="post-item">
            <Link to={`/articles/${props.article.accessToken}`}><h2>{props.article.title}</h2></Link>
            <PublishedDate className="post-published-date" date={props.article.publishedAt} />
            <div className="post-item-count">评论数:{props.article.commentsCount}</div>
            <Separator className="post-separator" alignContent="center" />
        </div>
    )
}

function PostList(props) {

    function onRenderCell(article, index) {
        return (
            <PostItem article={article}/>
        )
    }
    return (
        <div>
            <Separator alignContent="center" className="separator"><Icon iconName="CaloriesAdd" styles={{root: { fontSize: "3rem"}}}/></Separator>
            <List items={props.articles.filter(a => a.title)} className="postlist-wrapper" onRenderCell={onRenderCell} />
        </div>
    )
}


export default PostList;