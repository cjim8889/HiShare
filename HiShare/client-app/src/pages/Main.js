import React, { useEffect, useState } from "react";
import { DefaultButton, PrimaryButton } from "office-ui-fabric-react";
import { Text } from "office-ui-fabric-react/lib/Text";
import { Link } from "react-router-dom";
import PostList from "../components/PostList";
import Api from "../utilities/Api";
import { Pivot, PivotItem, PivotLinkSize } from 'office-ui-fabric-react/lib/Pivot';
import "./Main.css";
import { CollectionList } from "../components/CollectionList";

function Main(props) {
    const [articles, setArticles] = useState([]);
    const [collections, setCollections] = useState([]);
    const [disabledArticles, setDisabledArticles] = useState(false);
    const [articlesPage, setArticlePage] = useState(0);

    useEffect(() => {
        Api.GetPublicArticles(articlesPage * 30).then((response) => {
            setArticles(a => {
                return [...a, ...response.data];
            });
        });
    }, [articlesPage]);

    useEffect(() => {
        if (articles.length === 30) {
            setDisabledArticles(false);
        } else {
            setDisabledArticles(true);
        }
    }, [articles]);

    useEffect(() => {
        Api.GetPublicCollections(0).then((response) => {
            setCollections(response.data);
        });
    },[]);

    function handleLoadArticles() {
        setArticlePage(articlesPage + 1);
    }

    return (
        <div className="main-page">
            <h1>HiShare</h1>
            <Text variant={"large"} block className="main-introduction">
                这是一个简单的文字分享平台，任何人都可以分享和评论并且完全匿名。
            </Text>
            <div className="main-button-group">
                <Link to="/articles/new"><DefaultButton data-automation-id="test" text="发表文章" /></Link>
                <Link to="/collections/new"><PrimaryButton text="创建Collection" /></Link>
            </div>
            <Pivot linkSize={PivotLinkSize.large} className="main-display">
                <PivotItem headerText="文章">
                    <PostList articles={articles}/>
                    <div className="main-page-more">
                        <DefaultButton onClick={handleLoadArticles} disabled={disabledArticles}>加载更多</DefaultButton>
                    </div>
                </PivotItem>
                <PivotItem headerText="Collections">
                    <CollectionList collections={collections}/>
                </PivotItem>
            </Pivot>
        </div>
    );
}

export default Main;
