import React from "react";
import CommentList from "../components/Comment";
import PublishedDate from "../components/PublishedDate";
import "./Article.css";
import { Redirect } from "react-router-dom";
import Api from "../utilities/Api";
import DOMPurify from "dompurify";
import loadCodeHighlighting from "../utilities/CodeHighlighting";
import "../utilities/CodeHighlighting.css"

class Article extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            article: {},
            children: [],
            accessToken: props.match.params.token,
            invalidToken: false
        };


        this.rootNode = React.createRef();

        this.composeContent = this.composeContent.bind(this);

    }


    async componentDidMount() {
        let response = await Api.GetArticle(this.state.accessToken);

        if (response === null || response === undefined) {
            this.setState({invalidToken: true});
        } else {
            let article = {...response.data, content: JSON.parse(response.data.content)};
            this.setState({article: article}, () => {
                this.setState({children: this.composeContent()}, () => {
                    loadCodeHighlighting();
                });
            })
        }
    }

    composeContent() {
        const children = [];

        let key = 1;
        if (this.state.article.content != null) {
            this.state.article.content.forEach((block) => {
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
                    console.log(block);
                    doc = (
                        <pre key={key.toString()}>
                            <code dangerouslySetInnerHTML={{__html: block.data.code}}></code>
                        </pre>
                    );
                }


                key += 1;
                children.push(doc);
            });
        }

        let comments = <CommentList accessToken={this.state.accessToken} key="comment" comments={this.state.article.comments} />;
        children.push(<PublishedDate key="published-date" date={this.state.article.publishedAt} />);
        children.push(comments);

        return children;
    }

    render() {
        return (
            <div className="article-page" ref={this.rootNode} >
                {this.state.children}
                {
                    this.state.invalidToken ?
                        <Redirect to="/404"/>
                        : null
                }
            </div>
        )
    }
}

export default Article;