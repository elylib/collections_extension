import MidwestOrderItem from '../scrapers/MidwestOrderItem';
import {sendMidwestItemsToSpreadsheet} from './CommunicateWithServer';

export function processMidwestSubmission(wskey) {
    // We return a function so we can take in WSKey, but put an argument-free function in the
    // callback to be called by the event listener that has WSKey in its closure
    return function () {
        if (document.getElementById('cph1_chbxSendOrders1').checked) {
            let items = createMidwestOrder(document);
            sendMidwestItemsToSpreadsheet(items, wskey);
        }
    }
}

export function showMissingFunds() {
    for (let item of document.querySelectorAll('#orders .orow')) {
        if (item.querySelector('[id^="oi"]').textContent.indexOf('Fund: ') === -1) {
            let el = document.createElement('p');
            el.setAttribute('style', 'color: red');
            el.textContent = 'Please add a fund.';
            item.querySelector('[id^="cph1_rptOrders_lblOrderInfo_"]').appendChild(el);
        }
    }
}

function createMidwestOrder() {
    /*
     * Iterate over all items on Midwest cart page and put them into a fund-indexed object
     *
     * We need the fund information because Midwest could have multiple funds on the same
     * order. Indexing an object by fund allows us to just use the one data structure
     * to send the items, using keys for fund info and values for the items.
     *
     * WARNING: Items not given a fund by the selector won't be added since there is no
     * way to guess which spreadsheet they would go on. A warning for any items missing
     * fund info should be displayed by the showMissingFunds function below. Selectors should
     * be periodically reminded of this because it also makes it more difficult for acquisitions
     * to process.
     */
    let items = {};
    for (let item of document.querySelectorAll('#orders .orow')) {
        let orderItem = new MidwestOrderItem(item);
        let fund = orderItem.getFund();
        if (fund && orderItem.orderThisItem()) {
            if (fund in items) {
                items[fund].push(orderItem.toPlainObject());
            } else {
                items[fund] = [];
                items[fund].push(orderItem.toPlainObject());
            }
        }
    }
    return items;
}