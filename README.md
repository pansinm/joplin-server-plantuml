# support show plantuml in share page

## Usage
 
1. Prepare
```bash
# extract file from container
sudo docker create joplin/server:latest | xargs -I % sudo docker cp %:/home/joplin/packages/server/node_modules/@joplin/renderer/MdToHtml.js .

# download plantuml plugin
wget https://raw.githubusercontent.com/pansinm/joplin-server-plantuml/main/dist/plantuml.js
```

2. edit MdToHtml.js
```diff
const rules = {
+   plantuml: require('./MdToHtml/rules/plantuml').default,
    fence: require('./MdToHtml/rules/fence').default,
```
3. edit docker-compose.yml
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