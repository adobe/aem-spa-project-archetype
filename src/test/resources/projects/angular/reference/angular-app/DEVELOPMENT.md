
You need to set the API_HOST configuration in [src/environments/environment.ts](https://github.com/adobe/aem-spa-project-archetype/blob/master/src/main/resources/archetype-resources/angular-app/src/environments
/environment.ts#L22) pointing to your AEM instance:

```API_HOST: "http://localhost:4502"```,

Then:

```
npm run start
```
This will open the local dev server on port 4200. You can navigate then to http://localhost:4200/content/test-spa-angular-project/en/home.html


Most probably this is due to CORS rejection, so you might want to either configure AEM to accept CORS or bypass it from the browser if you are doing local development.  
Also assure that your request to the AEM instance is authorized.

* Instantiate a CustomModelClient such as [CustomModelClient.js](https://github.com/adobe/aem-spa-project-archetype/blob/master/src/main/resources/archetype-resources/angular-app/CustomModelClient.js) 
when initializing the [ModelManager in src/app/app.component.ts](https://github.com/adobe/aem-spa-project-archetype/blob/master/src/main/resources/archetype-resources/angular-app/src/app/app.component.ts#L52)
* If necessary adapt the Authorization header in [CustomModelClient.js](https://github.com/adobe/aem-spa-project-archetype/blob/master/src/main/resources/archetype-resources/angular-app/CustomModelClient.js#L20) 

1. Navigate to the Configuration Manager on the AEM instance at http://localhost:4502/system/console/configMgr
2. Look for the configuration: Adobe Granite Cross-Origin Resource Sharing Policy
3. Create a new configuration with the following additional values:
    * Allowed Origins: http://localhost:4200
    * Supported Headers: Authorization
    * Allowed Methods: OPTIONS
    
Most probably the images are having relative paths, and because we are not on AEM they won't exist on this server.
Quick fix would be to force the AEM absolute path on the images from the image component