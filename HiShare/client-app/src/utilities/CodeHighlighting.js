import hljs from 'highlight.js';

import javascript from 'highlight.js/lib/languages/javascript';
import python from 'highlight.js/lib/languages/python';


export default function loadCodeHighlighting() {
    hljs.registerLanguage("javascript", javascript);
    hljs.registerLanguage("python", python);

    hljs.initHighlightingOnLoad();
}