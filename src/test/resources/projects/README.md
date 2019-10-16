# Archetype Testing

## Overview

The `maven-archetype-plugin` is used to perform integration tests on the developed archetype.

This testing approach consists of these steps:

- `maven-archetype-plugin` searches for folders with testing input under [`src/test/resources/projects/`](.)
- For every testing folder it reads testing properties from the corresponding `archetype.properties` file
- `mvn archetype:generate` is executed with these testing properties
- The plugin executes a set of additional Maven goals on the generated project. Testing goals are defined in the corresponding `goal.txt` file
- The generated output is compared with the files in the `reference/` folder

## Executing tests

```sh
mvn clean install archetype:integration-test
```

## Adding a testing folder

To add a new testing folder, create a directory under `src/test/resources/projects/` with `goal.txt` and `archetype.properties` files and optionally a `reference/` folder.
