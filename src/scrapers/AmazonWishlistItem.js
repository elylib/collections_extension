import {wishlistIsbnRegex, wishlistAuthorsRegex} from '../util/Regexes';
import {GenericScraper} from "./GenericScraper";

const amazonBaseUrl = 'https://www.amazon.com';

export default class AmazonWishlistItem extends GenericScraper {

    constructor(item) {
        super(item);
        this.item = item;
        this.itemNameAndUrl = this.item.querySelector('[id^="itemName_"]');
    }

    getPrice() {
        let price = this.item.querySelector('[id^="itemPrice_"]');
        try {
            return price.getElementsByClassName('a-price-whole')[0].textContent + price.getElementsByClassName('a-price-fraction')[0].textContent;
        } catch (e) {
            price = this.item.getElementsByClassName('itemUsedAndNewPrice')[0];
        }
        try {
            return this.extractPrice(price);
        } catch (e) {
            return '0.0';
        }
    }

    getISBN() {
        try {
            return this.url().match(wishlistIsbnRegex)[1];
        } catch (e) {
            return '';
        }
    }

    getTitle() {
        try {
            return this.itemNameAndUrl.textContent.trim();
        } catch (e) {
            return '';
        }
    }

    getAuthors() {
        try {
            let byline = this.item.querySelector('[id^="item-byline-"]').textContent;
            return byline.match(wishlistAuthorsRegex)[1];
        } catch (e) {
            return '';
        }
    }

    getUrl() {
        try {
            let itemAddress = this.itemNameAndUrl.getAttribute('href');
            return amazonBaseUrl + itemAddress;
        } catch (e) {
            return '';
        }
    }

    toPlainObject() {
        return {
            price: this.getPrice(),
            isbn: this.getISBN(),
            title: this.getTitle(),
            authors: this.getAuthors(),
            url: this.getUrl()
        };
    }
}
