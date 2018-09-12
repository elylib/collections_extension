import {fillFormFields} from "./Interface";
import {checkHoldings, siteNotSupported} from "./Holdings";
import {scraperFactory} from "./ScraperFactory";

const browser = require('webextension-polyfill');

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
    browser.tabs.query({active: true, currentWindow: true}).then(tabs => {
        browser.tabs.sendMessage(tabs[0].id, {text: 'doSomething'}).then(response => {
            fillFormFields(response);
            checkHoldings(response, wskey);
        }).catch(siteNotSupported);
    });
}
export function listenForQueryFromPopup() {
    let scraper = scraperFactory(window.location.href);
    browser.runtime.onMessage.addListener(() => {
        return Promise.resolve(scraper.toPlainObject());
    });
}
