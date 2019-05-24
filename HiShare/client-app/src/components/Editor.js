import React from "react";
import EditorJs from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import ImageTool from '@editorjs/image';
import "./Editor.css";
import Api from "../utilities/Api";

class Editor extends React.Component {
    constructor(props) {
        super(props);

        this.editor = null;
        this.onChange = this.onChange.bind(this);
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
            onChange: this.onChange,
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
                }
            }
        });

        this.props.onReady(this.editor);
    }
    

    onChange() {
        this.props.onChange(this.editor);
    }

    render() {
        return <div id="editorjs" />;
    }
}

export default Editor;
