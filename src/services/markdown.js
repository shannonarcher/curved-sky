import hljs from 'highlight.js';
import 'highlight.js/styles/monokai-sublime.css';
import Markdownit from 'markdown-it';

const markdownRenderer = new Markdownit({
  highlight(str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value;
      } catch (__) {
        console.error('An error occurred when highlighting code block.');
      }
    }

    return ''; // use external default escaping
  },
});

export default function (markdown) {
  return markdownRenderer.render(markdown);
}
