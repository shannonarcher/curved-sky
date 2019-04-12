import hljs from 'highlight.js';
import 'highlight.js/styles/monokai-sublime.css';
import Markdownit from 'markdown-it';

const markdownRenderer = new Markdownit({
  highlight(str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return `<pre class="hljs"><code>${hljs.highlight(lang, str, true).value}</code></pre>`;
      } catch (__) {}
    }

    return `<pre class="hljs"><code>${markdownRenderer.utils.escapeHtml(str)}</code></pre>`;
  },
});

export default function (markdown) {
  return markdownRenderer.render(markdown);
}
