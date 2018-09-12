import {DOMElements} from "./DOMElements";
import {getHoldingsInfoFromServer} from "./CommunicateWithServer";

const holdingsInfo = {
    held: {text: 'We own this item', style: {color: '#ff3c3c'}},
    notHeld: {text: 'We do not own this item', style: {color: '#39e603'}},
    unknown: {text: 'Can\'t verify ownership', style: {color: '#efeb4f'}},
    unsupported: {text: 'This website is not supported.', style: {color: '#ff3c3c'}}
};

function updateHoldings(holdingsInfo) {
    DOMElements.holdingsDiv.innerHTML = '<p style="color: ' + holdingsInfo.style.color + '">' + holdingsInfo.text + '</p>';
}

export function checkHoldings(item, wskey) {
    /*
     * Check OCLC to see if we hold an item.
     *
     * If item is falsey (most likely undefined) or it doesn't have an
     * isbn property set short circuit with the appropriate message.
     * Else hit the server for holdings information.
     */
    // If we don't have an item or ISBN, bail early rather than hitting the server, save bandwidth
    if (!item) {
        updateHoldings(holdingsInfo.unsupported);
        return;
    } else if (!item.isbn) {
        updateHoldings(holdingsInfo.unknown);
        return;
    }

    getHoldingsInfoFromServer(wskey, item)
        .then(holding => {
            if (holding.holdings) {
                updateHoldings(holdingsInfo.held);
            } else {
                updateHoldings(holdingsInfo.notHeld);
            }
        })
        .catch(() => {
            updateHoldings(holdingsInfo.unknown);
        });
}

export function siteNotSupported() {
    updateHoldings(holdingsInfo.unsupported);
}