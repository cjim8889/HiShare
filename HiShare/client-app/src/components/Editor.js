import React from "react";
import EditorJs from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import ImageTool from '@editorjs/image';
import Marker from '@editorjs/marker';
import InlineCode from '@editorjs/inline-code';
import CodeTool from "../utilities/CodeHighlighting";
import Markdown from "../utilities/Markdown";
import "./Editor.css";
import Api from "../utilities/Api";

class Editor extends React.Component {
    constructor(props) {
        super(props);

        this.editor = null;
    }

    handleChange() {
        this.props.onChange();
    }

    componentDidMount() {
        let blocks = this.props.blocks
            ? this.props.blocks
            : [
                  {
                      type: "header",
                      data: {
                          text: "你好世界...",
                          level: 1
                      }
                  },
                  {
                      type: "paragraph",
                      data: {
                          text: "..."
                      }
                  }
              ];

        this.editor = new EditorJs({
            autofocus: true,
            holders: "editorjs",
            onChange: this.handleChange,
            data: {
                blocks: blocks
            },
            tools: {
                header: {
                    class: Header,
                    shortcut: "CMD+SHIFT+H"
                },
                list: {
                    class: List,
                    shortcut: "CMD+SHIFT+L"
                },
                image: {
                    class: ImageTool,
                    config: {
                        uploader: {
                            uploadByFile: Api.UploadImageByFile,
                            uploadByUrl: Api.UploadImageByUrl
                        }
                    },
                    shortcut: "CMD+SHIFT+I"
                },
                marker: {
                    class: Marker,
                    shortcut: 'CMD+SHIFT+M',
                },
                inlineCode: {
                    class: InlineCode,
                    shortcut: 'CMD+SHIFT+C',
                },
                code: {
                    class: CodeTool,
                    shortcut: 'CMD+SHIFT+X',
                },
                markdown: {
                    class: Markdown,
                    shortcut: 'CMD+SHIFT+D',
                }
            }
        });

        this.props.onReady(this.editor);
    }

    render() {
        return <div id="editorjs" />;
    }
}

export default Editor;
