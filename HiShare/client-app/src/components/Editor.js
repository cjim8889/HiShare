import React, { useState, useEffect } from 'react';
import EditorJs from '@editorjs/editorjs';
import Header from '@editorjs/header'

function Editor() {
    
    const [editorInstance, setEditorInstance] = useState(null)

    function onC() {
        console.log("changed")
    }

    useEffect(() => {
        setEditorInstance(new EditorJs({ 
            holders: "editorjs",
            onChange: onC,
            data: {
                blocks: [
                    {
                        type: "header",
                        data: {
                            text: "Editor.js",
                            level: 2
                        }
                    }
                ]
            },
            tools: {
                header: {
                    class: Header,
                    shortcut: 'CMD+SHIFT+H',
                }
            }
        }))

    }, [])



    return (
        <div id="editorjs"></div>
    )
}

export default Editor
