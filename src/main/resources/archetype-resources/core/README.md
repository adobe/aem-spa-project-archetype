This is core OSGi bundle for an AEM project set up with the SPA Maven Archetype for AEM (aem-spa-project-archetype).

Build and deploy

To build the application run

```
mvn clean install
```

To build and deploy the application to your local AEM instance use:

* `mvn -PautoInstallPackage` - Build and deploy to author instances

The first deployment may take a while until all updated OSGi bundles are installed.

After deployment you see the bundle deployed in your OSGI console

* Author: http://${aem.host}:${aem.port}${aem.contextPath}/system/console