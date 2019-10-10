# AEM SPA Project Archetype

This archetype creates a minimal Adobe Experience Manager project as a starting point for your own SPA projects. The properties that must be provided when using this archetype allow to name as desired all parts of this project.

See the [Getting Started with the AEM SPA Editor - WKND Events Tutorial](https://helpx.adobe.com/experience-manager/kt/sites/using/getting-started-spa-wknd-tutorial-develop.html) on the Adobe Help Center website for an example of how to use it.

## System requirements

- [Java](https://www.java.com/en/download/) 1.8 or higher
- [Maven](https://maven.apache.org/) 3.5.0 or higher
- Include the [Adobe Public Maven Repository]([adobe-public-maven-repo](https://repo.adobe.com)) in your Maven settings

It is recommended to set up the local AEM instances with `nosamplecontent` run mode.

## Usage

Run the following command to generate a project from the archetype:

```sh
mvn archetype:generate \
  -DarchetypeGroupId=com.adobe.cq.spa.archetypes \
  -DarchetypeArtifactId=aem-spa-project-archetype
```

Maven will prompt you for the following parameters:

- `groupId` - Maven artifact groupId for all projects
- `artifactId`(default is `${groupId}.${projectName}`) - Maven artifact "root" artifactId, is suffixed for the individual modules
- `version` (default is `1.0.0-SNAPSHOT`) - Maven artifact version
- `package` (default is `${groupId}.${projectName}`) - Java class package name
- `projectName` (default is `mysamplespa`) - Used for building AEM apps path, content path, conf etc. Should not include spaces or special character.
- `projectTitle` (default is `My Sample SPA`) - Descriptive project name
- `componentGroup` (default is `${projectTitle}`) - Name of the component group in AEM Editor
- `optionFrontend` (default is `react`) - Type of frontent project, allowed options: either angular or react

See [`archetype-metadata.xml`](./src/main/resources/META-INF/maven/archetype-metadata.xml) for the full list possible parameters.

## Modules

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

## Provided Maven profiles
The generated maven project support different deployment profiles when running the Maven install goal `mvn install` within the reactor.

Id                        | Description
--------------------------|------------------------------
autoInstallBundle         | Install core bundle with the maven-sling-plugin to the felix console
autoInstallPackage        | Install the ui.content and ui.apps content package with the content-package-maven-plugin to the package manager to default author instance on localhost, port 4502. Hostname and port can be changed with the aem.host and aem.port user defined properties.
autoInstallPackagePublish | Install the ui.content and ui.apps content package with the content-package-maven-plugin to the package manager to default publish instance on localhost, port 4503. Hostname and port can be changed with the aem.host and aem.port user defined properties.

The profile `integrationTests` is also available for the verify goal, to run the provided integration tests on the AEM instance.

## Development

### Building

1. Clone this repository: `git clone REPO_URL`
2. Navigate into the project directory: `cd aem-spa-project-archetype`
3. Add the archetype to the local archetype catalog: `mvn clean install archetype:update-local-catalog`
4. Navigate into a different directory where you want to generate a project from the archetype
5. Update the list of locally available archetypes: `mvn archetype:crawl`
6. Generate a project from the local archetype:

```sh
mvn archetype:generate \
  -DarchetypeCatalog=local \
  -DarchetypeGroupId=com.adobe.cq.spa.archetypes \
  -DarchetypeArtifactId=aem-spa-project-archetype
```

### Contributing

Contributions are welcome! Read the [Contributing Guide](CONTRIBUTING.md) for more information.

### Releasing

On every commit to the `master` branch, GitHub Actions will run the tests and make a snapshot deployment if they are successful. To create and deploy a (non-snapshot) release, run the following commands:

```sh
# Remove "-SNAPSHOT" from the version number in the POM file
mvn versions:set -DremoveSnapshot

# Commit and tag the changes
git commit -am "v1.2.3"  # Replace with your version number
git tag "v1.2.3"  # Replace with your version number
git push --follow-tags
```

If the tests pass on CI, this will deploy the project to OSSRH and automatically release it to the Central Repository.

After successfully creating a new release, create a new snapshot version to be able to continue development:

```sh
# Increase and add "-SNAPSHOT" to the version number in the POM file
mvn versions:set -DnextSnapshot

# Commit the changes
git commit -am "Prepare next development iteration"
git push
```
