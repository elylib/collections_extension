import {DOMElements} from "./util/DOMElements";
import {sendPopupItemToSpreadsheet} from "./util/CommunicateWithServer";
import {getAllFromLocalStorage, storeSubjectArea} from "./util/BrowserAPI";
import {authenticate} from "./util/CommunicateWithServer";
import {logout, showItemFormAndTryToGetItemInfo} from "./util/Interface";

// If we have a wskey in local storage, we are logged in. Otherwise login form will show.
getAllFromLocalStorage()
    .then(({wskey, subjectArea, selector}) => {
        if (wskey) {
            showItemFormAndTryToGetItemInfo(selector, wskey, subjectArea);
        }
    });

DOMElements.loginForm.addEventListener('submit', authenticate);

// Heuristic here is people using the popup are likely to be looking for multiple items in the same
// subject area in a single session, so we store the last selected subject area and automatically
// set it every time the popup is opened.
DOMElements.subjectAreaSelect.addEventListener('change', storeSubjectArea);

DOMElements.logout.addEventListener('click', logout);

DOMElements.itemForm.addEventListener('submit', sendPopupls sItemToSpreadsheet);