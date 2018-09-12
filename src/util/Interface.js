import {DOMElements} from "./DOMElements";
import {clearLocalStorage, queryContentScript} from "./BrowserAPI";
import {setSubjectAreaSelectBox} from "./SubjectAreas";

export function showLoggedIn() {
    DOMElements.loginFormContainer.className = 'hidden';
    DOMElements.itemFormContainer.classList.remove('hidden');
}

export function showNotLoggedIn() {
    DOMElements.loginFormContainer.classList.remove('hidden');
    DOMElements.itemFormContainer.classList.add('hidden');
}

export function logout(e) {
    e.preventDefault();

    clearLocalStorage();
    DOMElements.wskeyInput.value = '';
    DOMElements.selectorInput.value = '';
    showNotLoggedIn();
}

export function fillFormFields(response) {
    DOMElements.isbnInput.value = response.isbn || '';
    DOMElements.priceInput.value = response.price || '';
    DOMElements.authorInput.value = response.authors || '';
    DOMElements.titleInput.value = response.title || '';
    DOMElements.urlInput.value = response.url || '';
}

export function showItemFormAndTryToGetItemInfo(selector, wskey, subjectArea) {
    DOMElements.wskeyInput.value = wskey;
    setSubjectAreaSelectBox(selector, subjectArea);
    showLoggedIn();
    queryContentScript(wskey);
}