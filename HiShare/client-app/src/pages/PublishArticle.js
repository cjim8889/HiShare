import React from "react";
import Editor from "../components/Editor";
import PublishController from "../components/PublishController";
import { Redirect } from "react-router-dom";
//eslint-disable-next-line
import { ProgressIndicator } from 'office-ui-fabric-react/lib/ProgressIndicator';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import "./PublishArticle.css";
import Api from "../utilities/Api";


class PublishArticle extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            blocks: JSON.parse(localStorage.getItem("blocks")),
            editorInstance: null,
            publishedRedirect: false,
            accessToken: null,
            recaptchaToken: null,
            publishError: false
        };

        this.handleEditorChange = this.handleEditorChange.bind(this);
        this.handleEditor = this.handleEditor.bind(this);
        this.handlePublish = this.handlePublish.bind(this);
        this.handleClearEditor = this.handleClearEditor.bind(this);
        this.handleRecaptchaCallback = this.handleRecaptchaCallback.bind(this);
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
            this.setState({blocks: output.blocks});
            localStorage.setItem("blocks", JSON.stringify(output.blocks));
        });
    }

    handleEditor(editor) {
        this.setState({editorInstance: editor});
    }

    async handlePublish(isPublic) {
        let article = {
            content: JSON.stringify(this.state.blocks),
            isPublic: isPublic
        };

        try {
            let response = await Api.NewArticle(article, this.state.recaptchaToken);

            this.setState({accessToken: response.data.accessToken});
            this.setState({publishedRedirect: true});
            localStorage.removeItem("blocks");
        } catch (e) {
            this.setState({publishError: true});
        }
    }

    handleRecaptchaCallback(token) {
        this.setState({recaptchaToken: token});
    }

    render() {
        return (
            <div className="publish-page">
                {
                    this.state.publishedRedirect ?
                        <Redirect to={{
                            pathname: `/articles/${this.state.accessToken}`
                        }}/>
                        :null
                }

                <Editor onChange={this.handleEditorChange} onReady={this.handleEditor} blocks={this.state.blocks} />
                {
                    this.state.publishError ?
                        <MessageBar messageBarType={MessageBarType.error} isMultiline={false} dismissButtonAriaLabel="Close">
                            发布文章失败,请刷新重试
                        </MessageBar>
                        : null
                }
                <PublishController handleRecaptcha={this.handleRecaptchaCallback} handlePublish={this.handlePublish} handleClear={this.handleClearEditor}/>
            </div>
        )
    }
}

export default PublishArticle;