import React from "react";
import CommentList from "../components/Comment";
import "./Article.css";

class Article extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            article: {
                id: "fkaopdf2324",
                publishedAt: "5/21/2019, 12:11:40 AM",
                expiredAt: "5/29/2019, 12:11:40 AM",
                comments: [
                    {
                        id: "eof4",
                        publishedAt: "5/21/2019, 12:11:40 AM",
                        content : "真的说的很有道理"
                    },
                    {
                        id: "eoff4",
                        publishedAt: "5/21/2019, 12:11:40 AM",
                        content : "真的说的没有道理真的说的没有道理真的说的没有道理真的说的没有道理真的说的没有道理真的说的没有道理真的说的没有道理"
                    },],
                contents: JSON.parse("[{\"type\":\"header\",\"data\":{\"text\":\"标题...\",\"level\":2}},{\"type\":\"paragraph\",\"data\":{\"text\":\"央视网消息（新闻联播）：中共中央总书记、国家主席、中央军委主席习近平21日到陆军步兵学院视察。他强调，要深入贯彻新时代党的强军思想，深入贯彻新时代军事战略方针，面向战场、面向部队、面向未来，走内涵式发展道路，强化政治保证，把好办学定位，深化改革创新，全面提高办学育人水平，为强军事业提供有力人才支持。\"}},{\"type\":\"paragraph\",\"data\":{\"text\":\"WOCAONIM\"}},{\"type\":\"paragraph\",\"data\":{\"text\":\"卧槽送电池1\"}}, {\"type\":\"image\",\"data\":{\"url\":\"https://www.tesla.com/tesla_theme/assets/img/_vehicle_redesign/roadster_and_semi/roadster/hero.jpg\",\"caption\":\"Hello World!\"}}]")
            },
            children: []
        };


        this.rootNode = React.createRef();

        this.composeContent = this.composeContent.bind(this);
    }

    composeContent() {
        const children = [];

        this.state.article.contents.forEach((block) => {
            let doc;
            if (block.type === "header") {

                doc = React.createElement(`h${block.data.level}`, null, block.data.text);

            } else if (block.type === "paragraph") {

                doc = <p>{block.data.text}</p>;

            } else if (block.type === "image") {

                doc = <figure>
                    <img src={block.data.url} alt="" />
                    {
                        block.data.caption ?
                            <figcaption>{block.data.caption}</figcaption>
                            : null
                    }
                </figure>;

            }


            children.push(doc);
        });

        let comments = <CommentList comments={this.state.article.comments} />;
        children.push(<div className="publish-time">发表时间:{this.state.article.publishedAt}</div>);
        children.push(comments);


        return children;
    }

    componentDidMount() {
        let children = this.composeContent();
        console.log(children);
        this.setState({children: children});
    }

    render() {
        return (
            <div className="article-page" ref={this.rootNode} >
                {this.state.children}
            </div>
        )
    }
}

export default Article;