import React from "react";
import "./Article.css";

class Article extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          article: {
              id: "fkaopdf2324",
              publishedAt: "5/21/2019, 12:11:40 AM",
              expiredAt: "5/29/2019, 12:11:40 AM",
              comments: [],
              contents: JSON.parse("[{\"type\":\"header\",\"data\":{\"text\":\"标题...\",\"level\":1}},{\"type\":\"paragraph\",\"data\":{\"text\":\"正文...\"}},{\"type\":\"paragraph\",\"data\":{\"text\":\"WOCAONIM\"}},{\"type\":\"paragraph\",\"data\":{\"text\":\"卧槽送电池1\"}}]")
          }
        };


        this.rootNode = React.createRef();

        this.composeContent = this.composeContent.bind(this);
    }

    composeContent() {
        this.state.article.contents.forEach((block) => {
            let doc;
            if (block.type === "header") {
                doc = document.createElement(`h${block.data.level}`);
                doc.innerText = block.data.text;


            } else if (block.type === "paragraph") {
                doc = document.createElement("p");
                doc.innerHTML = block.data.text;
            }

            this.rootNode.current.append(doc);
        });
    }

    componentDidMount() {
        this.composeContent();
    }

    render() {
        return (
            <div className="article-page" ref={this.rootNode} />
        )
    }
}

export default Article;