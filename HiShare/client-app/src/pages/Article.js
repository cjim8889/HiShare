import React, { useState, useEffect, useCallback } from "react";
import CommentList from "../components/Comment";
import PublishedDate from "../components/PublishedDate";
import "./Article.css";
import { Redirect } from "react-router-dom";
import Api from "../utilities/Api";
import DOMPurify from "dompurify";
import { LightAsync as SyntaxHighlighter } from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { RenderMarkdown } from "../utilities/Markdown";
import CommentInterface from "../components/CommentInterface";

export default function Article(props) {
    const [invalidToken, setInvalidToken] = useState(false);
    const [article, setArticle] = useState({});
    const [articleContent, setArticleContent] = useState([]);

    useEffect(() => {
        Api.GetArticle(props.match.params.token).then((response) => {
            let article = {...response.data, content: JSON.parse(response.data.content)};
            setArticle(article);
        }).catch((err) => {
            console.log(err);
            setInvalidToken(true);
        });
    }, [props.match.params.token]);

    const composeArticleContent = useCallback(() => {
        let children = [];

        let key = 1;
        if (article.content != null) {
            article.content.forEach((block) => {

                let doc = renderElement(block, key);
                key += 1;
                children.push(doc);
            });
        }

        return children;
    }, [article.content]);

    useEffect(() => {
        let children = composeArticleContent();
        setArticleContent(children);
    }, [article, composeArticleContent]);

    function handleNewComment(comment) {
        setArticle({...article, comments: [...article.comments, comment]});
    }


    function renderElement(block, key) {

        let purifiedText, doc;

        if (block.data.text) {
            purifiedText = DOMPurify.sanitize(block.data.text);
        }

        if (block.type === "header") {
            doc = React.createElement(`h${block.data.level}`, {
                key: key,
                dangerouslySetInnerHTML: {
                    __html: purifiedText
                }
            });
        } else if (block.type === "paragraph") {

            doc = <p key={key.toString()} dangerouslySetInnerHTML={{__html: purifiedText}} />

        } else if (block.type === "image") {

            doc = <figure key={key.toString()}>
                <img src={block.data.file.url} alt={block.data.caption ? block.data.caption : "HiShare"} />
                {
                    block.data.caption ?
                        <figcaption>{block.data.caption}</figcaption>
                        : null
                }
            </figure>;

        } else if (block.type === "code") {
            doc = (
                <SyntaxHighlighter className="article-code-block" key={key.toString()} showLineNumbers={true} language={block.data.language ? block.data.language : "plaintext"} style={docco}>{block.data.code}</SyntaxHighlighter>
            );
        } else if (block.type === "markdown") {
            doc = RenderMarkdown(block.data.markdown, key);
        } else if (block.type === "list") {
            console.log(block);
            if (block.data.style === "ordered") {
                doc = (
                    <ol key={key.toString()}>
                        {block.data.items.map((item, index) => {
                            return <li key={index.toString()} dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(item)}} />;
                        })}
                    </ol>
                );
            } else {
                doc = (
                    <ul key={key.toString()}>
                        {block.data.items.map((item, index) => {
                            return <li key={index.toString()} dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(item)}} />;
                        })}
                    </ul>
                );
            }
        }

        return doc;
    }

    return (
        <div className="article-page">
            {articleContent}
            <PublishedDate key="published-date" date={article.publishedAt} />
            <CommentList handleNewComment={handleNewComment} accessToken={props.match.params.token} key="comment" comments={article.comments ? article.comments : []} />
            <CommentInterface accessToken={props.match.params.token} onNew={handleNewComment} />

            {
                invalidToken ?
                    <Redirect to="/404"/>
                    : null
            }
        </div>
    )
}