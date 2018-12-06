# Initial AEM SPA project template

This is a content package for an AEM project set up with the SPA Maven Archetype for AEM (aem-spa-project-archetype).

## Modules of this project:

* [core](core/): OSGi bundle containing:
  * Java classes (e.g. Sling Models, Servlets, business logic)
* [ui.apps/src/main/content/jcr_root/apps](ui.apps/src/main/content/jcr_root/apps/):
  * AEM components with their scripts and dialog definitions
* [ui.content/src/main/content/jcr_root/conf](ui.content/src/main/content/jcr_root/conf/): 
  * AEM content package with editable templates stored at `/conf`
* [ui.content/src/main/content/jcr_root/content](content/jcr_root/content/): 
  * AEM content package containing sample content (for development and test purposes)
* [angular-app](angular-app/): Angular application in case frontend chosen is set to be "angular" at project generation 
* [react-app](react-app/): React application in case frontend chosen is set to be "react" at project generation 
* [all](all/): All-in-One package


## Build all modules

To build all the modules run in the project root directory the following command with Maven:

    mvn clean install

### Module build order and installation

The frontend modules builds and transpiles the es6 javascript source code into a browser friendly 2015 version. 
It then creates a client library and copy the built javascript files in the [ui.apps/src/main/content/jcr_root/apps](ui.apps/src/main/content/jcr_root/apps/) module. 
Run your Maven command lines from the root of the project to respect the module build ordering and ensure the latest 
version of the frontend module is used.   

For ease of the build and installation the following profiles are provided in the root:

 * ``autoInstallPackage`` - installs the package/bundle to an existing AEM author instance
 * ``autoInstallPackagePublish`` - installs the package/bundle to an existing AEM publish instance
  
### UberJar
 
This project relies on the unobfuscated AEM 6.4 cq-quickstart. This is publicly available on https://repo.adobe.com
 
For more details about the UberJar please head over to the
[How to Build AEM Projects using Apache Maven](https://helpx.adobe.com/experience-manager/6-4/sites/developing/using/ht-projects-maven.html)
documentation page.
 
### Install everything
 
In the All-in-One package in [all](all/) there is additional profile available to package all the dependencies into a 
single content package and install everything to an existing AEM
 
 * ``autoInstallSinglePackage`` - installs the All-in-One package to an existing AEM author instance
 * ``autoInstallSinglePackagePublish`` - installs the All-in-One package to an existing AEM publish instance

 
    mvn clean install -PautoInstallSinglePackage

You can also choose build environment by using setting `build.environment` property (format: colon + name):

    mvn clean install -PautoInstallSinglePackage -Dbuild.environment=":production"

Available environments:

* empty string (default): non-production / development
* `production`: production

After deployment you can open the sample content page in your browser:

* Author: http://${aem.host}:${aem.port}${aem.contextPath}/editor.html/content/${projectName}/en.html

## System requirements

* JDK 1.8 or higher
* Apache Maven 3.5.0 or higher
* Include the [Adobe Public Maven Repository][adobe-public-maven-repo] in your maven settings

It is recommended to set up the local AEM instances with `nosamplecontent` run mode.

## Maven settings

The project comes with the auto-public repository configured. To setup the repository in your Maven settings, refer to:

    http://helpx.adobe.com/experience-manager/kb/SetUpTheAdobeMavenRepository.html
   

