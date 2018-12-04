
```
API_HOST=http://localhost:4502 npm run start
```
This will open the local dev server on port 9000. You can navigate then to `http://localhost:9000/content/test-spa-react-project/en/home.html`
where `API_HOST` points to your AEM instance.

Most probably this is due to CORS rejection, so you might want to either configure AEM to accept CORS or bypass it from the browser if you are doing local development. 
Also assure that your request to the AEM instance is authorized.

* Instantiate a CustomModelClient such as [src/server/CustomModelClient.js](https://github.com/adobe/aem-spa-project-archetype/blob/master/src/main/resources/archetype-resources/react-app/src/server/CustomModelClient.js) 
when initializing the [ModelManager in src/index.js](https://github.com/adobe/aem-spa-project-archetype/blob/master/src/main/resources/archetype-resources//react-app/src/index.js#L42)
* If necessary adapt the Authorization header in [src/server/CustomModelClient.js](https://github.com/adobe/aem-spa-project-archetype/blob/master/src/main/resources/archetype-resources//react-app/src/server/CustomModelClient.js#L21) 

1. Navigate to the Configuration Manager on the AEM instance at http://localhost:4502/system/console/configMgr
2. Look for the configuration: Adobe Granite Cross-Origin Resource Sharing Policy
3. Create a new configuration with the following additional values:
    * Allowed Origins: http://localhost:9000
    * Supported Headers: Authorization
    * Allowed Methods: OPTIONS

Most probably the images are having relative paths, and because we are not on AEM they won't exist on this server.
Quick fix would be to force the AEM absolute path on the images from the image component
