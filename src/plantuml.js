import { encode } from "plantuml-encoder";
export default {
  assets: function () {
    return [];
  },

  plugin: function (markdownIt) {
    const defaultRender =
      markdownIt.renderer.rules.fence ||
      function (tokens, idx, options, env, self) {
        return self.renderToken(tokens, idx, options, env, self);
      };

    markdownIt.renderer.rules.fence = function (
      tokens,
      idx,
      options,
      env,
      self
    ) {
      const token = tokens[idx];
      if (token.info !== "plantuml")
        return defaultRender(tokens, idx, options, env, self);

      const deflateCode = encode(token.content);
      const contentHtml = markdownIt.utils.escapeHtml(token.content);
      // Note: The mermaid script (`contentHtml`) needs to be wrapped
      // in a `pre` tag, otherwise in WYSIWYG mode TinyMCE removes
      // all the white space from it, which causes mermaid to fail.
      // See PR #4670 https://github.com/laurent22/joplin/pull/4670
      return `
				<div class="joplin-editable">
					<pre class="joplin-source" data-joplin-language="plantuml" data-joplin-source-open="\`\`\`plantuml&#10;" data-joplin-source-close="&#10;\`\`\`&#10;">${contentHtml}</pre>
					<img src="${process.env.PLANTUML_SERVER}/plantuml/svg/${deflateCode}">
				</div>
			`;
    };
  },
};
