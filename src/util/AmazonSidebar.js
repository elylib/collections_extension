import AmazonWishlistItem from "../scrapers/AmazonWishlistItem";
import {buildOptions} from "./SubjectAreas";
import {sendWishlistItemsToSpreadsheet} from './CommunicateWithServer';

const visibleMessages = {
    true: {text: 'All items Visible', style: {color: '#39e603'}},
    false: {text: 'Not all items Visible', style: {color: '#ff3c3c'}}
};

export class AmazonWishlist {

    constructor(wskey, selector) {
        this.wskey = wskey;
        this.items = this.getWishlistItems();
        this.totalPrice = this.tallyWishlistPrices();
        this.totalItems = this.items.length;
        this.allVisible = this.allItemsVisible();

        this.showWishlistSidebar(selector);

        document.getElementById('updateTotal').addEventListener('click', this.update);
        document.getElementById('sendToSpreadsheet').addEventListener('click', sendWishlistItemsToSpreadsheet);
    }

    showWishlistSidebar(selector) {
        let newDiv = document.createElement('div');
        newDiv.setAttribute('id', 'wishlistSidebar');
        newDiv.setAttribute('style', 'position: fixed; right: 0; minWidth: 100px; top: 40%; background: #1a4d8c; color: white; padding: 1em');
        document.body.appendChild(newDiv);
        newDiv.innerHTML = this.wishlistSidebarHTML(selector);
    }

    getWishlistItems() {
        return Array.from(document.querySelectorAll('*[id^="item_"]')).map(element => new AmazonWishlistItem(element).toPlainObject());
    }

    tallyWishlistPrices() {
        return this.items.reduce((acc, cur) => acc + parseFloat(cur.price), 0.0).toFixed(2);
    }

    allItemsVisible() {
        return !!document.getElementById('endOfListMarker');
    }

    wishlistSidebarHTML(selector) {
        let color = visibleMessages[this.allVisible].style.color;
        let visibleText = visibleMessages[this.allVisible].text;
        let subjectAreas = buildOptions(selector);
        return `
<div id="amazon-sidebar">
    <p># of items: <span id="totalNumberOfItems">${this.totalItems}</span></p>
    <p>Total amount: <span id="totalCost">$${this.totalPrice}</span></p>
    <p style="color: ${color}"><span id="allItemsVisible">${visibleText}</span></p>
    <label for="subject-area">Subject Area: </label>
    <select name="subject-area" id="subject-area">${subjectAreas}</select>
    <br/><br/>
    <input type="button" id="updateTotal" value="Update Totals"/>
    <input type="button" id="sendToSpreadsheet" value="Send to Spreadsheet"/>
    <div id="request-status"></div>
</div>
`;
    }

    update() {
        this.items = this.getWishlistItems();
        this.totalItems = this.items.length;
        this.totalPrice = this.tallyWishlistPrices();
        this.allVisible = this.allItemsVisible();
        document.getElementById('totalCost').textContent = this.totalItems;
        document.getElementById('allItemsVisible').textContent = this.allVisible;
        document.getElementById('totalCost').textContent = this.totalPrice;
    }
}