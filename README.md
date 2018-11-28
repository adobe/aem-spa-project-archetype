## Maven Archetype for SPA Starter Kit

## System requirements

- [Java](https://www.java.com/en/download/) 1.8 or higher
- [Maven](https://maven.apache.org/) 3.5.0 or higher
- Include the [Adobe Public Maven Repository](adobe-public-maven-repo) in your maven settings

It is recommended to set up the local AEM instances with `nosamplecontent` run mode.

Modules of the generated project is defined in [src/main/resources/archetype-resources](src/main/resources):

* [core](core/): OSGi bundle containing:
  * Java classes (e.g. Sling Models, Servlets, business logic)
* [ui.apps/src/main/content/jcr_root/apps](content/jcr_root/apps/):
  * AEM components with their scripts and dialog definitions
* [ui.content/src/main/content/jcr_root/conf](content/jcr_root/conf/): 
  * AEM content package with editable templates stored at `/conf`
* [ui.content/src/main/content/jcr_root/content](content/jcr_root/content/): 
  * AEM content package containing sample content (for development and test purposes)
* [angular-app](angular-app/): Angular application in case frontend chosen is set to be "angular" at project generation 
* [react-app](react-app/): React application in case frontend chosen is set to be "react" at project generation 
* [all](all/): Combines all modules to be installed as content package in AEM

## Required parameters

This archetype requires following parameters:
- `groupId` - Maven artifact groupId for all projects
- `artifactId`(default is `${groupId}.${projectName}`) - Maven artifact "root" artifactId, is suffixed for the individual modules
- `version` (default is `1.0.0-SNAPSHOT`) - Maven artifact version
- `package` (default is `${groupId}.${projectName}`) - Java class package name
- `projectName` (default is `mysamplespa`) - Used for building AEM apps path, content path, conf etc. Should not include spaces or special character.
- `projectTitle` (default is `My Sample SPA`) - Descriptive project name
- `componentGroup` (default is `${projectTitle}`) - Name of the component group in AEM Editor
- `optionFrontend` (default is `react`) - Type of frontent project, allowed options: either angular or react

## Building SPA Starter Kit Archetype

```
$ mvn clean install archetype:update-local-catalog
```

## Updating list of locally available archetypes

```
$ mvn archetype:crawl
```

## Archetype catalog variants

Depending on the use case maven can use different archetype variant (use `-DarchetypeCatalog` to choose one):
- `internal` represents `~/.m2/repository/`
- `local` represents `~/.m2/archetype-catalog.xml`
- `remote` represents http://repo.maven.apache.org/maven2/archetype-catalog.xml

## Using SPA Starter Kit Archetype

Archetype `aem-spa-project-archetype` must be available locally (by cloning this repo and building it) or on artifactory.

You must be in a directory without a `pom.xml` file. A sub-folder will be created for the newly created project.

Starter Kit project can be created using following options:
- in command line in **interactive** mode
- in command line in **batch** mode

### Creating project in interactive mode

In interactive mode a series of questions will be asked set parameters for new project.

```
$ mvn archetype:generate \
     -DarchetypeCatalog=internal \
     -DarchetypeGroupId=com.adobe.cq.spa.archetypes  \
     -DarchetypeArtifactId=aem-spa-project-archetype  \
     -DarchetypeVersion=1.0.0-SNAPSHOT \
```

Please note that properties declared in [archetype-metadata.xml](src/main/resources/META-INF/maven/archetype-metadata.xml) with `defaultValue` are not asked during interactive mode and are defaulted to suggested values. 

### Creating project in batch mode

In batch mode all the required parameters muse be set via `-Dparameter=value` argument.
```
$ mvn archetype:generate -B \
     -DarchetypeCatalog=local  \
     -DarchetypeGroupId=com.adobe.cq.spa.archetypes  \
     -DarchetypeArtifactId=aem-spa-project-archetype  \
     -DarchetypeVersion=1.0.0-SNAPSHOT \
     -Dpackage=<package> \
     -DgroupId=<group-id> \
     -DartifactId=<artifact-id> \
     -Dversion=<version> \
     -DprojectTitle="<project-title>"  \
     -DprojectName=<project-name>  \
     -DcomponentGroup=<component-group> \
     -DoptionFrontend=react
```

## Build all modules

Now we have our project generated! To build all the modules run in the project root directory the following command with Maven:

    mvn clean install

### Module build order

The `react-app` module builds and transpiles the es6 javascript source code into a browser friendly 2015 version. 
It then creates a client library and copy the built javascript files in the `content` module. 
Run your Maven command lines from the root of the project to respect the module build ordering and ensure the latest version of the `react-app` module is used.   

For ease of build and installation the following profiles are provided:

 * ``autoInstallPackage`` - installs the package/bundle to an existing AEM author instance
 * ``autoInstallPackagePublish`` - installs the package/bundle to an existing AEM publish instance
 * ``autoInstallSinglePackage`` - package all the dependencies into a single content package and install everything to an existing AEM author instance
 * ``autoInstallSinglePackagePublish`` - package all the dependencies into a single content package and install everything to an existing AEM publish instance
 
### UberJar
 
This project relies on the unobfuscated AEM 6.3 cq-quickstart. This is publicly available on https://repo.adobe.com
 
For more details about the UberJar please head over to the
[How to Build AEM Projects using Apache Maven](https://docs.adobe.com/docs/en/aem/6-2/develop/dev-tools/ht-projects-maven.html#What%20is%20the%20UberJar?)
documentation page.
 
### Install everything
 
You can install everything needed to use the components on your running AEM instance by issuing the following command in the top level folder of the project:
 
    mvn clean install -PautoInstallSinglePackage

You can also choose build environment by using setting `build.environment` property (format: colon + name):

    mvn clean install -PautoInstallSinglePackage -Dbuild.environment=":production"

Available environments:

* empty string (default): non-production / development
* `production`: production

### Install local version of NPM sub-modules

You can install local version of the NPM modules `@adobe/cq-spa-page-model-manager` and `@adobe/cq-spa-component-mapping` by changing a few lines in the `react-app` module's POM. By default, the released versions of those modules are transitively installed by `@adobe/cq-react-editable-components` but it is possible to override this and install local development versions instead.

First, build and link the local NPM modules you want to use by running (for instance, in your local checkout of `@adobe/cq-spa-page-model-manager`):
    
    npm run build && npm link
    
Then use the `npmLinkDeps` profile when installing the project's bundles and packages such as:

    mvn clean install -PautoInstallPackage,npmLinkDeps
 
### Individual packages/bundles
 
You can install individual packages/bundles by issuing the following command in the top level folder of the project:
 
    mvn clean install -PautoInstallPackage -pl <project_name(s)> -am
 
Please note that

 * ``-pl/-projects`` option specifies the list of projects that you want to install
 * ``-am/-also-make`` options specifies that dependencies should also be built

