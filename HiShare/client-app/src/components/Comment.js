import React from "react";
import { List } from 'office-ui-fabric-react/lib/List';
import { Separator } from 'office-ui-fabric-react/lib/Separator';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import CommentInterface from '../components/CommentInterface';
import "./Comment.css";

function CommentList(props) {

    function onRenderCell(items, index) {
        return (
            <div className="comment-item" id={items.id}>
                <a href={"#" + items.id}>#{items.id}</a>
                <p>{items.content}</p>
                <Separator alignContent="center" />
            </div>
        )
    }
    return (
        <div className="comment-list">
            <Separator alignContent="center" className="separator"><Icon iconName="Comment" styles={{root: { fontSize: "3rem"}}}/></Separator>
            <List items={props.comments} onRenderCell={onRenderCell}/>
            <CommentInterface/>
        </div>
    )
}

export default CommentList;