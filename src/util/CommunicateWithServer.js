import 'whatwg-fetch';
import {requestStates, setStatusMessage} from "./Status";
import {DOMElements} from "./DOMElements";
import {isAValidSelector} from "./SubjectAreas";
import {storeWSKeyAndSelectorId} from "./BrowserAPI";
import {showItemFormAndTryToGetItemInfo} from "./Interface";

export function sendMidwestItemsToSpreadsheet(items, wskey) {
    for (let fund of Object.getOwnPropertyNames(items)) {
        sendItemsToSpreadsheet(fund, items[fund], wskey, null);
    }
}

export function sendWishlistItemsToSpreadsheet() {
    let statusDiv = document.getElementById('request-status');
    let fund = document.getElementById('subject-area').value;
    setStatusMessage(requestStates.pending, statusDiv);
    sendItemsToSpreadsheet(fund, this.items, this.wskey, statusDiv);
}

export function sendPopupItemToSpreadsheet(e) {
    e.preventDefault();

    setStatusMessage(requestStates.pending, DOMElements.requestStatus);
    let item = {
        title: DOMElements.titleInput.value,
        authors: DOMElements.authorInput.value,
        isbn: DOMElements.isbnInput.value,
        price: DOMElements.priceInput.value,
        url: DOMElements.urlInput.value
    };

    // The item goes in an array so the server can process single items and wishlists of items generically
    sendItemsToSpreadsheet(DOMElements.subjectAreaSelect.value, [item], DOMElements.wskeyInput.value, DOMElements.requestStatus)
}

export function authenticate(e) {
    e.preventDefault();

    let selector = DOMElements.selectorInput.value;
    let wskey = DOMElements.wskeyInput.value;

    if (!isAValidSelector(selector)) {
        setStatusMessage(requestStates.invalid_id, DOMElements.requestStatus);
        return;
    }

    tryToAuthenticate(wskey)
        .then(response => checkResponse(response))
        .then(() => {
            storeWSKeyAndSelectorId(wskey, selector);
            setStatusMessage(requestStates.clear, DOMElements.requestStatus);
            showItemFormAndTryToGetItemInfo(selector, wskey, null);
        })
        .catch(() => {
            setStatusMessage(requestStates.auth_failure, DOMElements.requestStatus);
        })
}

export function getHoldingsInfoFromServer(wskey, item) {
    return fetch('http://localhost:5000/check_holdings', {
        method: 'POST',
        body: JSON.stringify({
            auth: wskey,
            isbn: item.isbn
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(resp => checkResponse(resp))
}

function sendItemsToSpreadsheet(subjectArea, items, auth, statusDiv) {
    return fetch("http://localhost:5000/add_to_spreadsheet",
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                add_fund_code: subjectArea,
                item_data: items,
                auth: auth
            })
        })
        .then(resp => checkResponse(resp))
        .then(resp => {
            if (resp.success) {
                setStatusMessage(requestStates.success, statusDiv);
            } else {
                setStatusMessage(requestStates.failure, statusDiv);
            }
        })
        .catch(() => {
            setStatusMessage(requestStates.failure, statusDiv);
        })
}

function tryToAuthenticate(wskey) {
    return fetch('http://localhost:5000/extension_login', {
        method: 'POST',
        body: JSON.stringify({auth: wskey}),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

function checkResponse(response) {
    if (response.ok) {
        return response.json();
    }
    throw new Error(response.statusText);
}