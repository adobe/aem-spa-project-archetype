# React App

This project was bootstrapped with [`create-react-app`](https://github.com/facebook/create-react-app).

This application is built to consume the AEM model of a site. It will automatically generate the layout using the helper components from the [`@adobe/cq-react-editable-components`](https://www.npmjs.com/package/@adobe/cq-react-editable-components) package.

## Scripts

In the project directory, you can run the following commands:

### `npm start`

Runs the app in development mode by proxying the JSON model from a local AEM instance running at http://localhost:4502. This assumes that the entire project has been deployed to AEM at least once (`mvn clean install -PautoInstallPackage` **in the project root**).

After running `npm start` **in the `react-app` directory**, your app will be automatically opened in your browser (at path http://localhost:3000/content/test-spa-react-project/en/home.html). If you make edits, the page will reload.

If you are getting errors related to CORS, you might want to configure AEM as follows:

1. Navigate to the Configuration Manager (http://localhost:4502/system/console/configMgr)
2. Open the configuration for "Adobe Granite Cross-Origin Resource Sharing Policy"
3. Create a new configuration with the following additional values:
   - Allowed Origins: http://localhost:3000
   - Supported Headers: Authorization
   - Allowed Methods: OPTIONS

### `npm test`

Launches the test runner in the interactive watch mode. See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run test:debug`

See the section about [debugging tests](https://facebook.github.io/create-react-app/docs/debugging-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder. It bundles React in production mode and optimizes the build for the best performance. See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

Furthermore, an AEM ClientLib is generated from the app using the [`aem-clientlib-generator`](https://github.com/wcm-io-frontend/aem-clientlib-generator) package.
