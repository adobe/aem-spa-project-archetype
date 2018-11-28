
```
API_HOST=http://localhost:4502 APP_ROOT_PATH=/content/test-spa-react-project/en npm run start
```
This will open the local dev server on port 9000. You can navigate then to http://localhost:9000/content/test-spa-react-project/en/home.html


For now we need to overcome some technical difficulties in order to get the server actually working.

If you see that your requests are failing most probably the requests are not authorized.  
You should modify the `PageModelManager#fetchModel` method to add the `Authorization` header:
[here](https://www.npmjs.com/package/@adobe/cq-spa-page-model-manager)
you should add the following header:
```
xhr.setRequestHeader('Authorization', 'Basic YWRtaW46YWRtaW4=');
```
Most probably the images are having relative paths, and because we are not on AEM they won't exist on this server.  
Quick fix would be to force the AEM absolute path on the images from the image component

Most probably this is due to CORS rejection, so you might want to either configure AEM to accept CORS or bypass it from
 the browser if you are doing local development.  
**Also** make sure you login in AEM instance in the same browser.

To enable the local server to serve the content, please proceed as follow:
- Navigate to the Configuration Manager on the AEM instance http://localhost:4502/system/console/configMgr
- Configuration name: Adobe Granite Cross-Origin Resource Sharing Policy
  - ```Allowed Origins```: domain (ex: http://localhost:4502) or *
  - ```Supported Headers```: Authorization
  - ```Allowed Methods```: OPTIONS
- Configure the authentication headers of your requests
  - Instantiate the [react-app/src/server/CustomModelClient.js](react-app/src/server/CustomModelClient.js) when initializing the ModelManager in [react-app/src/index.js](react-app/src/index.js)