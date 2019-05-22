import React, {useState} from "react";
import { List } from 'office-ui-fabric-react/lib/List';
import { Separator } from 'office-ui-fabric-react/lib/Separator';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import CommentInterface from '../components/CommentInterface';
import "./Comment.css";

function CommentList(props) {

    const [comments, setComments] = useState([...props.comments]);

    function onRenderCell(items, index) {
        return (
            <div className="comment-item" key={items.id} id={items.id}>
                <a href={"#" + items.id}>#{items.id}</a>
                <p>{items.content}</p>
                <Separator alignContent="center" />
            </div>
        )
    }

    function handleNewComment(comment) {
        setComments([...comments, comment]);
    }
    return (
        <div className="comment-list">
            <Separator alignContent="center" className="separator"><Icon iconName="Comment" styles={{root: { fontSize: "3rem"}}}/></Separator>
            <List items={comments} onRenderCell={onRenderCell}/>
            <CommentInterface accessToken={props.accessToken} onNew={handleNewComment} />
        </div>
    )
}

export default CommentList;