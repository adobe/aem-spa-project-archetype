---

**IMPORTANT:** The SPA archetype has been merged into the [AEM Project Archetype](https://github.com/adobe/aem-project-archetype). This repository is no longer maintained.

---

# AEM SPA Project Archetype

This archetype creates a minimal Adobe Experience Manager project as a starting point for your own SPA project.

See the [WKND Events Tutorial](https://helpx.adobe.com/experience-manager/kt/sites/using/getting-started-spa-wknd-tutorial-develop.html) on the Adobe Help Center website for an example of how to use it.

## Usage

### Requirements

- Java 8 or higher
- Maven 3.5 or higher
- AEM 6.4.7+ or 6.5.3+

### Generating a project

Run the following command to generate a project from the archetype:

```sh
mvn archetype:generate \
  -DarchetypeCatalog=remote \
  -DarchetypeGroupId=com.adobe.cq.spa.archetypes \
  -DarchetypeArtifactId=aem-spa-project-archetype \
  -DarchetypeVersion=4.0.0
```

Maven will prompt you for the following parameters:

- **`projectTitle`**: Descriptive project name (e.g. `My App`)
- **`projectName`**: Technical project name, used for building AEM paths (like `/content/${projectName}/en`, e.g. `myapp`)
- **`groupId`**: ID which uniquely identifies your group and project, should start with a reversed domain name you control (e.g. `com.mycompany`)
- **`optionFrontend`**: Frontend framework to use in the generated project (either `angular` or `react`)

See [`archetype-metadata.xml`](./src/main/resources/META-INF/maven/archetype-metadata.xml) for the full list possible parameters.

## Documentation

- [How to use the generated AEM project](./src/main/resources/archetype-resources/README.md)
- [How to use the generated Angular app](./src/main/resources/archetype-resources/angular-app/README.md)
- [How to use the generated React app](./src/main/resources/archetype-resources/react-app/README.md)

## Development

### Building

To make modifications to this archetype and use it locally, follow these steps:

1. Clone the repository: `git clone REPO_URL`
2. Navigate into the project directory: `cd aem-spa-project-archetype`
3. Switch to the `development` branch: `git checkout development`
4. Add the archetype to the local archetype catalog: `mvn clean install archetype:update-local-catalog`
5. Navigate into a different directory where you want to generate a project from the archetype
6. Update the list of locally available archetypes: `mvn archetype:crawl`
7. Generate a project from the local archetype:

```sh
mvn archetype:generate \
  -DarchetypeCatalog=local \
  -DarchetypeGroupId=com.adobe.cq.spa.archetypes \
  -DarchetypeArtifactId=aem-spa-project-archetype \
  -DarchetypeVersion=4.0.1-SNAPSHOT
```

## Docs

- [SPA ClientLib](./docs/spa-clientlib.md)
- [Browser support](./docs/browser-support.md)
- [Code Splitting](./docs/code-splitting.md)

### Contributing

Contributions are welcome! Read the [Contributing Guide](CONTRIBUTING.md) for more information.

### Releasing

To create a release and have CI deploy it to the Central Repository, follow these steps:

1. Decide on the version number of the new release (e.g. `v1.2.3`)

2. Update the `archetype:generate` commands in this `README` file with the new version number (so users install the latest version of the archetype)

3. Run the following commands to create the release. If the tests pass on CI, this will deploy the project to OSSRH and automatically release it to the Central Repository:

   ```sh
   NEW_VERSION="1.2.3"  # Replace with your version number

   # Update the version in all POM files
   mvn versions:set -DnewVersion=$NEW_VERSION

   # Commit and tag the change
   git commit -am "v${NEW_VERSION}"
   git tag "v${NEW_VERSION}"
   git push && git push --tags
   ```

4. After successfully creating the release, create a new snapshot version which will be used for further development:

   ```sh
   # Increase and add "-SNAPSHOT" to the version number in the POM file
   mvn versions:set -DnextSnapshot

   # Commit the changes
   git commit -am "Prepare next development iteration"
   git push
   ```

5. Update the changelog on the [Releases](https://github.com/adobe/aem-spa-project-archetype/releases) page
