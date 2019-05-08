import hljs from 'highlight.js/lib/highlight';
import javascript from 'highlight.js/lib/languages/javascript';
import xml from 'highlight.js/lib/languages/xml';
import 'highlight.js/styles/atom-one-dark-reasonable.css';

import Markdownit from 'markdown-it';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('xml', xml);

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
