# render plantuml diagram in share page

## Local

1. download plantuml rule file
```bash
cd server
wget https://raw.githubusercontent.com/pansinm/joplin-server-plantuml/main/dist/plantuml.js
cp plantuml.js ./node_modules/@joplin/renderer/MdToHtml/rules/
```
2. add the rule to renderer. edit `node_modules/@joplin/renderer/MdToHtml.js` and save
```diff
const rules = {
    fence: require('./MdToHtml/rules/fence').default,
    sanitize_html: require('./MdToHtml/rules/sanitize_html').default,
    image: require('./MdToHtml/rules/image').default,
    checkbox: require('./MdToHtml/rules/checkbox').default,
    katex: require('./MdToHtml/rules/katex').default,
    link_open: require('./MdToHtml/rules/link_open').default,
    link_close: require('./MdToHtml/rules/link_close').default,
    html_image: require('./MdToHtml/rules/html_image').default,
    highlight_keywords: require('./MdToHtml/rules/highlight_keywords').default,
    code_inline: require('./MdToHtml/rules/code_inline').default,
    fountain: require('./MdToHtml/rules/fountain').default,
    mermaid: require('./MdToHtml/rules/mermaid').default,
    source_map: require('./MdToHtml/rules/source_map').default,
+   plantuml: require('./MdToHtml/rules/plantuml').default,
};
```
3. start server with env `PLANTUML_SERVER=https://your.plantuml.server`


## Docker

1. download resource
```bash

# extract MdToHtml.js from container
sudo docker create joplin/server:latest | xargs -I % sudo docker cp %:/home/joplin/packages/server/node_modules/@joplin/renderer/MdToHtml.js .

# download plantuml rule
wget https://raw.githubusercontent.com/pansinm/joplin-server-plantuml/main/dist/plantuml.js
```

2. edit MdToHtml.js
```diff
const rules = {
    fence: require('./MdToHtml/rules/fence').default,
    sanitize_html: require('./MdToHtml/rules/sanitize_html').default,
    image: require('./MdToHtml/rules/image').default,
    checkbox: require('./MdToHtml/rules/checkbox').default,
    katex: require('./MdToHtml/rules/katex').default,
    link_open: require('./MdToHtml/rules/link_open').default,
    link_close: require('./MdToHtml/rules/link_close').default,
    html_image: require('./MdToHtml/rules/html_image').default,
    highlight_keywords: require('./MdToHtml/rules/highlight_keywords').default,
    code_inline: require('./MdToHtml/rules/code_inline').default,
    fountain: require('./MdToHtml/rules/fountain').default,
    mermaid: require('./MdToHtml/rules/mermaid').default,
    source_map: require('./MdToHtml/rules/source_map').default,
+   plantuml: require('./MdToHtml/rules/plantuml').default,
};

```
3. replace files. edit `docker-compose.yml` and save
```diff
    app:
        image: joplin/server:latest
        depends_on:
            - db
        ports:
            - "22300:22300"
        restart: unless-stopped
+       volumes:
+           - ./MdToHtml.js:/home/joplin/packages/server/node_modules/@joplin/renderer/MdToHtml.js
+           - ./plantuml.js:/home/joplin/packages/server/node_modules/@joplin/renderer/MdToHtml/rules/plantuml.js
        environment:
+           - PLANTUML_SERVER=http://your.plantuml.server
            - APP_PORT=22300

```
4. docker-compose up
