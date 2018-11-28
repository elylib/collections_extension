import {fillFormFields} from "./Interface";
import {checkHoldings, siteNotSupported} from "./Holdings";
import {scraperFactory} from "./ScraperFactory";

const browser = require('webextension-polyfill');

// Kind of using objects like enums here to cut down on typos
const localStorageKeys = {
    wskey: 'wskey',
    subjectArea: 'subjectArea',
    selector: 'selector'
};

export function getAllFromLocalStorage() {
    return browser.storage.local.get([
        localStorageKeys.wskey,
        localStorageKeys.subjectArea,
        localStorageKeys.selector
    ])
}

export function storeWSKeyAndSelectorId(wskey, selectorId) {
    browser.storage.local.set({
        [localStorageKeys.wskey]: wskey,
        [localStorageKeys.selector]: selectorId
    });
}

export function storeSubjectArea(e) {
    browser.storage.local.set({[localStorageKeys.subjectArea]: e.target.value})
}

export function clearLocalStorage() {
    browser.storage.local.remove(Object.keys(localStorageKeys));
}

export function queryContentScript(wskey) {
    /**
     * Ask the content script to give us item information from the page
     *
     * First we query the browser API to get the current active tab (i.e. the page
     * the user is on), then we message that tab, which has our content script that
     * is listening for this message (the message itself doesn't matter in this
     * case). Then we use the response to update the information in our popup and
     * check the item against our holdings. If messaging the tab throws an error
     * we assume the page is not supported.
     */
    browser.tabs.query({active: true, currentWindow: true}).then(tabs => {
        browser.tabs.sendMessage(tabs[0].id, {text: 'doSomething'}).then(response => {
            fillFormFields(response);
            checkHoldings(response, wskey);
        }).catch(siteNotSupported);
    });
}
export function listenForQueryFromPopup() {
    /**
     * Embedded in the content script, listen for a message from the popup and try to give it item information
     * @type {GenericScraper}
     */
    let scraper = scraperFactory(window.location.href);
    browser.runtime.onMessage.addListener(() => {
        return Promise.resolve(scraper.toPlainObject());
    });
}
