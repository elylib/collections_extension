import AmazonWishlistItem from "../scrapers/AmazonWishlistItem";
import {buildOptions} from "./SubjectAreas";

const visibleMessages = {
    true: {text: 'All items Visible', style: {color: '#39e603'}},
    false: {text: 'Not all items Visible', style: {color: '#ff3c3c'}}
};


export function showWishlistSidebar(selector) {
    let newDiv = document.createElement('div');
    newDiv.id = 'wishlistSidebar';
    newDiv.setAttribute('style', 'position: fixed; right: 0; minWidth: 100px; top: 40%; background: #1a4d8c; color: white; padding: 1em');
    newDiv.appendChild(wishlistSidebarHTML(selector));
    document.body.appendChild(newDiv);
}

export function getWishlistItems() {
    return Array.from(document.querySelectorAll('*[id^="item_"]')).map(element => new AmazonWishlistItem(element).toPlainObject());
}

function tallyWishlistPrices(items) {
    return items.reduce((acc, cur) => acc + parseFloat(cur.price), 0.0).toFixed(2);
}

function allItemsVisible(items) {
    // endOfListMarker ID is how Amazon knows it's at the end of a wishlist
    // wishlists show 30 items by default and won't have endOfList marker if fewer than 30 items
    return !!document.getElementById('endOfListMarker') || items.length < 30;
}

function wishlistSidebarHTML(selector) {
    /**
     * Will make an HTML node that looks essentially like the below example

     <p id="totalNumberOfItems"></p>
     <p id="totalCost"></p>
     <p id="allItemsVisible" style="color: ${color}">${visibleText}</p>
     <label for="subject-area">Subject Area: </label>
     <select name="subject-area" id="subject-area"></select>
     <input type="button" id="updateTotal" value="Update Totals"/>
     <input type="button" id="sendToSpreadsheet" value="Send to Spreadsheet"/>
     <p id="request-status"></p>
     */
    let items = getWishlistItems();
    let totalPrice = tallyWishlistPrices(items);
    let totalItems = items.length;
    let allVisible = allItemsVisible(items);
    let color = visibleMessages[allVisible].style.color;
    let visibleText = visibleMessages[allVisible].text;
    let frag = document.createDocumentFragment();

    let totalItemsP = document.createElement('p');
    totalItemsP.id = 'totalNumberOfItems';
    totalItemsP.textContent = totalNumberOfItemsText(totalItems);
    frag.appendChild(totalItemsP);

    let totalCostP = document.createElement('p');
    totalCostP.id = 'totalCost';
    totalCostP.textContent = totalPriceText(totalPrice);
    frag.appendChild(totalCostP);

    let allVisibleP = document.createElement('p');
    allVisibleP.id = 'allItemsVisible';
    allVisibleP.style.color = color;
    allVisibleP.textContent = visibleText;
    frag.appendChild(allVisibleP);

    let subjectAreaLabel = document.createElement('label');
    subjectAreaLabel.setAttribute('for', 'subject-area');
    frag.appendChild(subjectAreaLabel);

    let selectSubjectArea = document.createElement('select');
    selectSubjectArea.id = 'subject-area';
    selectSubjectArea.appendChild(buildOptions(selector));
    frag.appendChild(selectSubjectArea);

    frag.appendChild(document.createElement('br'));

    let updateButton = document.createElement('input');
    updateButton.setAttribute('type', 'button');
    updateButton.id = 'updateTotal';
    updateButton.value = 'Update Totals';
    frag.appendChild(updateButton);

    let submitButton = document.createElement('input');
    submitButton.setAttribute('type', 'button');
    submitButton.id = 'sendToSpreadsheet';
    submitButton.value = 'Send to Spreadsheet';
    frag.appendChild(submitButton);

    let statusP = document.createElement('p');
    statusP.id = 'request-status';
    frag.appendChild(statusP);

    return frag;
}

export function update() {
    let items = getWishlistItems();
    let totalItems = items.length;
    let totalPrice = tallyWishlistPrices(items);
    let allVisible = allItemsVisible(items);

    document.getElementById('totalNumberOfItems').textContent = totalNumberOfItemsText(totalItems);
    document.getElementById('allItemsVisible').textContent = visibleMessages[allVisible].text;
    document.getElementById('allItemsVisible').style.color = visibleMessages[allVisible].style.color;
    document.getElementById('totalCost').textContent = totalPriceText(totalPrice);
}

function totalNumberOfItemsText(totalItems) {
    return "# of items: " + totalItems;
}

function totalPriceText(totalPrice) {
    return "Total amount: " + totalPrice;
}