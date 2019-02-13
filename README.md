## Maven Archetype for SPA Starter Kit

This archetype creates a minimal Adobe Experience Manager project as a starting point for your own SPA projects. The properties that must be provided when using this archetype allow to name as desired all parts of this project.

See the [Getting Started with the AEM SPA Editor - WKND Events Tutorial](https://helpx.adobe.com/experience-manager/kt/sites/using/getting-started-spa-wknd-tutorial-develop.html) on the Adobe Help Center website for an example of how to use it.

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

## Provided Maven profiles
The generated maven project support different deployment profiles when running the Maven install goal `mvn install` within the reactor.

Id                        | Description
--------------------------|------------------------------
autoInstallBundle         | Install core bundle with the maven-sling-plugin to the felix console
autoInstallPackage        | Install the ui.content and ui.apps content package with the content-package-maven-plugin to the package manager to default author instance on localhost, port 4502. Hostname and port can be changed with the aem.host and aem.port user defined properties. 
autoInstallPackagePublish | Install the ui.content and ui.apps content package with the content-package-maven-plugin to the package manager to default publish instance on localhost, port 4503. Hostname and port can be changed with the aem.host and aem.port user defined properties.

The profile `integrationTests` is also available for the verify goal, to run the provided integration tests on the AEM instance.

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
     -DarchetypeVersion=1.0.3-SNAPSHOT \
```

Please note that properties declared in [archetype-metadata.xml](src/main/resources/META-INF/maven/archetype-metadata.xml) with `defaultValue` are not asked during interactive mode and are defaulted to suggested values. 

### Creating project in batch mode

In batch mode all the required parameters muse be set via `-Dparameter=value` argument.
```
$ mvn archetype:generate -B \
     -DarchetypeCatalog=local  \
     -DarchetypeGroupId=com.adobe.cq.spa.archetypes  \
     -DarchetypeArtifactId=aem-spa-project-archetype  \
     -DarchetypeVersion=1.0.3-SNAPSHOT \
     -Dpackage=<package> \
     -DgroupId=<group-id> \
     -DartifactId=<artifact-id> \
     -Dversion=<version> \
     -DprojectTitle="<project-title>"  \
     -DprojectName=<project-name>  \
     -DcomponentGroup=<component-group> \
     -DoptionFrontend=react
```
