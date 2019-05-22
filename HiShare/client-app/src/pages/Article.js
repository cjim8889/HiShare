import React from "react";
import CommentList from "../components/Comment";
import "./Article.css";
import { Redirect } from "react-router-dom";
import Api from "../utilities/Api";

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
                this.setState({children: this.composeContent()});
            })
        }
    }

    composeContent() {
        const children = [];

        let key = 1;
        this.state.article.content.forEach((block) => {
            let doc;
            if (block.type === "header") {

                doc = React.createElement(`h${block.data.level}`, {
                    key: key
                }, block.data.text);

            } else if (block.type === "paragraph") {

                doc = <p key={key.toString()}>{block.data.text}</p>;

            } else if (block.type === "image") {

                doc = <figure key={key.toString()}>
                    <img src={block.data.url} alt="" />
                    {
                        block.data.caption ?
                            <figcaption>{block.data.caption}</figcaption>
                            : null
                    }
                </figure>;

            }

            key += 1;
            children.push(doc);
        });

        let comments = <CommentList accessToken={this.state.accessToken} key="comment" comments={this.state.article.comments} />;
        children.push(<div key="publish-time" className="publish-time">发表时间:{this.state.article.publishedAt}</div>);
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