# GDSC FRONTEND REACT COMPONENTS

## FOLDER STRUCTURE

- src/pages - contains pages that make up the website. None of these pages should contain code but rather render components. This'll make it easier for others to use them to test their components
- src/components - all code will exist here.
- src/components/index.js - All components to be rendered in src/pages will be exported here
- src/components/majors/index.js - All components that make up a section will be exported here
- src/components/sections - All different variations of pages will be stored here eg. 4 navbars to choose from
- src/components/majors/:section/:specific - all sections that require multiple components will have them here

## FAQs

1. Why all the folders?

- For efficient team work, we need to able to work without having your work tampered without being informed. The folders are there to ensure everyone can contribute and not worry about finding their work disrupted.

2. Who can contribute?

- Anyone as long as you respect other people's work and are willing to contribute

3. What is the main aim of this project?

- To create re-usable components that we utilize in our projects, both personal and future community projects.
