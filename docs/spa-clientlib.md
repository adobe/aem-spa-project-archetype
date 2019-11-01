# SPA ClientLib

The SPA is made available using an [AEM ClientLib](https://helpx.adobe.com/experience-manager/6-5/sites/developing/using/clientlibs.html). When executing `npm run build`, the app is built and the [`aem-clientlib-generator`](https://github.com/wcm-io-frontend/aem-clientlib-generator) package takes the resulting `build` directory and transforms it into such a ClientLib.

The ClientLib will consist of the following files and directories:

- `css/`
  - CSS files which need to be requested in the HTML
- `js/`
  - JavaScript files which need to be requested in the HTML
- `resources/`
  - Source maps
  - Non-entrypoint code chunks (see [Code Splitting](./code-splitting.md))
  - Static assets (e.g. icons)
- `css.txt` (tells AEM the order and names of files in `css/` so they can be merged)
- `js.txt` (tells AEM the order and names of files in `js/` so they can be merged)
