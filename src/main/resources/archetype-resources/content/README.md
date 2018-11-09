This is a content package for an AEM project set up with the SPA Maven Archetype for AEM (aem-spa-project-archetype).

Build and deploy

To build the application run

```
mvn clean install
```

To build and deploy the application to your local AEM instance use:

* `mvn -PautoInstallPackage` - Build and deploy to author instances
* `mvn -PautoInstallPackagePublish` - Build and deploy to publish instances

After deployment you can open the sample content page in your browser:

* Author: http://${aem.host}:${aem.port}${aem.contextPath}/editor.html/content/${projectName}/en.html

System requirements

* JDK 1.8 or higher
* Apache Maven 3.5.0 or higher
* Include the [Adobe Public Maven Repository][adobe-public-maven-repo] in your maven settings

It is recommended to set up the local AEM instances with `nosamplecontent` run mode.

Modules of this project:

* [bundles/core](bundles/core/): OSGi bundle containing:
  * Java classes (e.g. Sling Models, Servlets, business logic)
* [content/jcr_root/apps](content/jcr_root/apps/):
  * AEM components with their scripts and dialog definitions
* [content/jcr_root/conf](content/jcr_root/conf/): 
  * AEM content package with editable templates stored at `/conf`
* [content/jcr_root/content](content/jcr_root/content/): 
  * AEM content package containing sample content (for development and test purposes)
