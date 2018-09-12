import {AmazonWishlist} from "./AmazonSidebar";
import {processMidwestSubmission, showMissingFunds} from "./MidwestOrder";
import {getAllFromLocalStorage} from "./BrowserAPI";

export function processIfMultiItemPage() {
    if (isAmazonWishlist(window.location.href)) {
        getAllFromLocalStorage().then(({wskey, selector}) => {
            new AmazonWishlist(wskey, selector)
        })
    } else if (isMidwestCart(window.location.href)) {
        showMissingFunds();
        let midwestSubmitButtons = document.querySelectorAll('[id^="cph1_btnApprove"]');
        getAllFromLocalStorage().then(({wskey}) => {
            Array.from(midwestSubmitButtons).forEach(button => {
                button.addEventListener('click', processMidwestSubmission(wskey));
            });
        })
    }
}

function isAmazonWishlist(url) {
    return url.indexOf('registry/wishlist') !== -1 || url.indexOf('registry/giftlist') !== -1 || url.indexOf('amzn.com/w') !== -1 || url.indexOf('hz/wishlist') !== -1;
}

function isMidwestCart(url) {
    return url.indexOf('v2016/Transactions/ConfirmOrders') !== -1;
}

