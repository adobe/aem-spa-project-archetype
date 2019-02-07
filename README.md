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
## Guidelines for SPA development in AEM

Developing single page applications on AEM assumes that the front-end developer observes standard best practices when creating an SPA. If as a front end developer you follow these general best practices as well as few AEM-specific principles, your SPA will be functional with AEM and its content-authoring capabilities.

* *Portability* - As with any components, the components should be built to be as portable as possible. The SPA should be built with portably and reusable components, avoiding static paths that refer to the content structure.
* *AEM Drives Site Structure* - The front end-developer creates components and owns their internal structure, but relies on AEM to define the content structure of the site.
* *Dynamic Rendering* - All rendering should be dynamic.
* *Dynamic Routing* - The SPA is responsible for the routing and AEM listens to it and fetches the component data based on it. Any routing should be dynamic as well.

If you keep these principles in mind as you develop your SPA, it will be as flexible and as future proof as possible while enabling all supported AEM authoring functionality. 

For further details about SPA development on AEM including guideliens, walkthroughs, best practices and examples, see the [AEM Developer Documentation](https://adobe.com/go/aem-dev-spa).