import React from "react";
import EditorJs from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import SimpleImage from "@editorjs/simple-image";
import "./Editor.css";

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
                          text: "标题...",
                          level: 1
                      }
                  },
                  {
                      type: "paragraph",
                      data: {
                          text: "正文..."
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
                    class: SimpleImage,
                    shortcut: "CMD+SHIFT+I"
                }
            }
        });

        this.props.onReady(this.editor);
    }

    //TODO: Implement this function
    handleUploadByFile(file) {
        return {
            success: 0
        }
    }

    handleUploadByUrl(url) {
        return {
            success: 1,
            file: {
                url: url
            }
        }
    }

    onChange() {
        this.props.onChange(this.editor);
    }

    render() {
        return <div id="editorjs" />;
    }
}

export default Editor;
