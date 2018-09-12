## Ely Library Browser Extension

This browser extension for Chromium (Chrome, Vivaldi, Opera) and Firefox browsers adds functionality to several sites for collection development activities. Currently, the sites include Amazon, Choice, and Midwest Library Services. It also makes an attempt to pull item information for any given page, though there are no guarantees.

### Install for Development

This project uses Webpack with Babel to keep logic modular and allow for modern Javascript features. It does not use a framework (React was initially used, but the logic seemed too complex for this small a project).

Clone the repository

Run `npm install` to grab dependencies

Run `npm run watch` to watch the file for changes while developing

When ready for distribution (upload, usually) run `npm run build`. This will build the project and place distribution files into the dist/ directory.

---

### Main Logic

The two primary files for the extension are popup.js and content.js.

### Popup.js

This file runs the interface when a user clicks on the extension in their browser toolbar. It handles things like asking for item information, handling submission behavior, and handling login behavior.

### Content.js

This file is injected into every page a user visits. If the page is a Choice review or an Amazon wishlist, it will inject some DOM elements, a link to search Amazon on the Choice review and a box to help with seeing the total cost and submit a wishlist. If a user opens the popup, it will send a request to this script which will attempt to scrape information from the page, query our server to find if we already own it, and send that information back to the popup. We hit our server to check availability rather than querying for that information directly because the APIs to check availability are not HTTPS and our queries will be most often coming from inside an HTTPS context, which means it isn't allowed to pull unsecured content.