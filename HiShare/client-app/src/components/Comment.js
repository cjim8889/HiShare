import React from "react";
import { List } from 'office-ui-fabric-react/lib/List';
import { Separator } from 'office-ui-fabric-react/lib/Separator';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import "./Comment.css";
import PublishedDate from "../components/PublishedDate";

function CommentItem(props) {
    return (
        <div className="comment-item" key={props.item.id} id={props.item.id}>
            <a className="comment-id" href={"#" + props.item.id}>#{props.item.id.substr(0, 6)}</a>
            <PublishedDate className="comment-publishDate" date={props.item.publishedAt}/>
            <p className="comment-content">{props.item.content}</p>
            <Separator className="comment-separator" alignContent="center" />
        </div>
    )
}

function CommentList(props) {


    function onRenderCell(items, index) {
        return (
            <CommentItem item={items}/>
        )
    }

    return (
        <div className="comment-list">
            <Separator alignContent="center" className="separator"><Icon iconName="Comment" styles={{root: { fontSize: "3rem"}}}/></Separator>
            <List items={props.comments} onRenderCell={onRenderCell}/>
        </div>
    )
}

export default CommentList;