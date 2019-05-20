import React from "react";
import Editor from "../components/Editor";
import PublishController from "../components/PublishController";
import { Redirect } from "react-router-dom";
//eslint-disable-next-line
import { ProgressIndicator } from 'office-ui-fabric-react/lib/ProgressIndicator';
import "./PublishArticle.css";


class PublishArticle extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            blocks: JSON.parse(localStorage.getItem("blocks")),
            editorInstance: null,
            publishedRedirect: false
        };

        this.handleEditorChange = this.handleEditorChange.bind(this);
        this.handleEditor = this.handleEditor.bind(this);
        this.handlePublish = this.handlePublish.bind(this);
        this.handleClearEditor = this.handleClearEditor.bind(this);
    }

    handleClearEditor() {
        this.state.editorInstance.render(
            {
                "blocks": [
                    {
                        type: "header",
                        data: {
                            text: "标题...",
                            level: 1
                        }
                    },
                    {
                        type: "paragraph",
                        data: {
                            text: "正文...",
                        }
                    }
                ]
            }
        );
    }

    handleEditorChange() {
        this.state.editorInstance.save().then(output => {
            localStorage.setItem("blocks", JSON.stringify(output.blocks));
        });
    }

    handleEditor(editor) {
        this.setState({editorInstance: editor});
    }

    handlePublish() {
        //TODO: Implement this function
        this.setState({publishedRedirect: true});
    }

    render() {
        return (
            <div className="publish-page">
                {
                    this.state.publishedRedirect ?
                        <Redirect to={{
                            pathname: "/"
                        }}/>
                        :null
                }
                <Editor onChange={this.handleEditorChange} onReady={this.handleEditor} blocks={this.state.blocks} />
                <PublishController handlePublish={this.handlePublish} handleClear={this.handleClearEditor}/>
            </div>
        )
    }
}

export default PublishArticle;