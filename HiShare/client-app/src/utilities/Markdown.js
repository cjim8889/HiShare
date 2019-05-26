import "./Markdown.css";
import DOMPurify from "dompurify";
import React from "react";
import marked from "marked";


export default class Markdown {
    static get enableLineBreaks() {
        return true;
    }

    constructor({data, config, api}) {
        this.api = api;

        this.placeholder = config.placeholder || Markdown.DEFAULT_PLACEHOLDER;

        this.CSS = {
            baseClass: this.api.styles.block,
            input: this.api.styles.input,
            wrapper: 'ce-markdown',
            textarea: 'ce-markdown__textarea',
        };

        this.nodes = {
            holder: null,
            textarea: null
        };

        this._data = {
            markdown: data.markdown || '',
        };

        this.nodes.holder = this.drawView();
    }

    drawView() {
        let wrapper = document.createElement('div'),
            textarea = document.createElement('textarea');

        wrapper.classList.add(this.CSS.baseClass, this.CSS.wrapper);
        textarea.classList.add(this.CSS.textarea, this.CSS.input);

        textarea.textContent = this._data.code;

        textarea.placeholder = this.placeholder;

        wrapper.appendChild(textarea);



        this.nodes.textarea = textarea;

        return wrapper;
    }

    render() {
        return this.nodes.holder;
    }

    save(wrapper) {
        return {
            markdown: this.nodes.textarea.value,
        };
    }



    static get DEFAULT_PLACEHOLDER() {
        return 'Markdown...';
    }

    static get toolbox() {
        return {
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="14pt" height="9pt" viewBox="0 0 14 9" version="1.1"><g id="surface1"><path style="fill:none;stroke-width:10;stroke-linecap:butt;stroke-linejoin:miter;stroke:rgb(0%,0%,0%);stroke-opacity:1;stroke-miterlimit:4;" d="M 14.973214 5 L 193.026786 5 C 198.540179 5 203.008929 9.5 203.008929 15 L 203.008929 113 C 203.008929 118.5 198.540179 123 193.026786 123 L 14.973214 123 C 9.459821 123 4.991071 118.5 4.991071 113 L 4.991071 15 C 4.991071 9.5 9.459821 5 14.973214 5 Z M 14.973214 5 " transform="matrix(0.0673077,0,0,0.0703125,0,0)"/><path style=" stroke:none;fill-rule:nonzero;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 2.019531 6.890625 L 2.019531 2.109375 L 3.367188 2.109375 L 4.710938 3.867188 L 6.058594 2.109375 L 7.402344 2.109375 L 7.402344 6.890625 L 6.058594 6.890625 L 6.058594 4.148438 L 4.710938 5.90625 L 3.367188 4.148438 L 3.367188 6.890625 Z M 10.433594 6.890625 L 8.414062 4.570312 L 9.757812 4.570312 L 9.757812 2.109375 L 11.105469 2.109375 L 11.105469 4.570312 L 12.453125 4.570312 Z M 10.433594 6.890625 "/></g></svg>`,
            title: 'Markdown'
        };
    }
}


export function RenderMarkdown(markdown, key) {
    let html = marked(markdown);
    let sanitizedHtml = DOMPurify.sanitize(html);

    return <div key={key.toString()} className="markdown-wrapper" dangerouslySetInnerHTML={{__html: sanitizedHtml}} />
}