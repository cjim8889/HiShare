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
    const [disabledCollections, setDisabledCollections] = useState(false);
    const [articlesPage, setArticlePage] = useState(0);
    const [collectionsPage, setCollectionsPage] = useState(0);

    useEffect(() => {
        Api.GetPublicArticles(articlesPage * 30).then((response) => {
            setArticles(a => {
                return [...a, ...response.data];
            });
        });
    }, [articlesPage]);

    useEffect(() => {
        Api.GetPublicCollections(collectionsPage * 30).then((response) => {
            setCollections(c => {
                return [...c, ...response.data];
            });
        });
    },[collectionsPage]);

    useEffect(() => {
        if (articles.length % 30 !== 0) {
            setDisabledArticles(true);
        } else {
            setDisabledArticles(false);
        }

        if (collections.length % 30 !== 0) {
            setDisabledCollections(true);
        } else {
            setDisabledCollections(false);
        }
    }, [articles, collections]);



    function handleLoadArticles() {
        setArticlePage(articlesPage + 1);
    }

    function handleLoadCollections() {
        setCollectionsPage(collectionsPage + 1);
    }

    return (
        <div className="main-page">
            <Text block variant={"xxLarge"} as="h1">HiShare</Text>
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
                    <div className="main-page-more">
                        <DefaultButton onClick={handleLoadCollections} disabled={disabledCollections}>加载更多</DefaultButton>
                    </div>
                </PivotItem>
            </Pivot>
        </div>
    );
}

export default Main;
