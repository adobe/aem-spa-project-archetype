### Archetype testing
Use maven archetype plugin to perform integration tests on the developed archetype. 
This testing approach consists of these steps:

- Archetype maven plugin searches for folders with testing input under ``src/test/resources/projects/``.
- For every testing folder it reads testing properties from ``archetype.properties``
- Executes ``mvn archetype:generate`` with testing properties
- Executes set of additional maven goals on generated project. Testing goals are read from file ``goal.txt``
- Compares generated output with files under ``reference/`` folder

#### Ignore the EOL encoding for comparing files
Set property ``archetype.test.ignoreEOLStyle`` for comparing files ( (default and original behaviour is false)
 
     
#### Add a testing folder
To add a new testing folder, create folder under ``src/test/resources/projects/``. 
Add file ``goal.txt`` and ``archetype.properties``. 

#### Adding reference files
In addition to running maven goals on generated projects, integration-test goal provides a way to compare 
generated files against a set of reference files. 
These reference files must be located under ``reference/`` directory.

#### Execute tests
     mvn clean install archetype:integration-test
     
