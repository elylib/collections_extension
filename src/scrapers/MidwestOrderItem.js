import {isbnRegex, mlsAuthorsRegex, mlsFundRegex} from '../util/Regexes';
import {GenericScraper} from "./GenericScraper";


export default class MidwestOrderItem extends GenericScraper {

    constructor(item, url) {
        super(url);
        this.item = item;
        this.itemInfo = this.item.querySelector('[id^="oi"]');
        this.itemInfoText = this.itemInfo.textContent;
        this.url = 'Midwest Order';
    }

    getAuthors() {
        try {
            return this.itemInfoText.match(mlsAuthorsRegex)[1];
        } catch (e) {
            return '';
        }
    }

    getTitle() {
        try {
            return this.itemInfo.getElementsByTagName('a')[0].textContent.trim();
        } catch (e) {
            return '';
        }
    }

    getPrice() {
        // Use querySelector so we can find node with ID that starts like this, since we won't know
        // the exact node ID ahead of time
        try {
            return this.extractPrice(this.item.querySelector('[id^="cph1_rptOrders_lblItmtot_"]'));
        } catch (e) {
            return '0.0';
        }
    }

    getISBN() {
        try {
            return this.itemInfoText.match(isbnRegex)[0];
        } catch (e) {
            return '';
        }
    }

    getFund() {
        try {
            return this.itemInfoText.match(mlsFundRegex)[1];
        } catch (e) {
            return '';
        }
    }

    orderThisItem() {
        return this.item.querySelector('[id^="cph1_rptOrders_lblSel_"]').textContent.trim() === 'o';
    }
}
