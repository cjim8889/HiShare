import React from "react";
import { DefaultButton } from "office-ui-fabric-react";
import { Text } from "office-ui-fabric-react/lib/Text";
import { Link } from "react-router-dom";
import "./Main.css";

function Main(props) {
    return (
        <div className="main-page">
            <h1>HiShare</h1>
            <Text variant={"large"} block>
                这是一个简单的文字分享平台，任何人都可以分享和评论并且完全匿名。
            </Text>
            <div className="main-button-group">
                <Link to="/articles/new"><DefaultButton data-automation-id="test" text="发表文章" /></Link>
            </div>
        </div>
    );
}

export default Main;
