import {isbnRegex, priceRegex} from '../util/Regexes';

export class GenericScraper {

    constructor(url) {
        /*
         * This scraper will look over the entire body of a page to find an ISBN and price
         * It sure ain't perfect, but it's as close to a generic scraper as it's going to get
         * It's also relatively expensive to look over the entirety of a page, so having our
         * specific ones are much better.
         */
        this.url = url;
    }

    getISBN() {
        try {
            return document.getElementsByTagName('body')[0].textContent.match(isbnRegex)[0]
        } catch (e) {
            return ''
        }
    }

    getTitle() {
        return '';
    }

    getAuthors() {
        return '';
    }

    getPrice() {
        try {
            return this.extractPrice(document.getElementsByTagName('body')[0])
        } catch (e) {
            return '';
        }
    }

    extractPrice(priceNode) {
        try {
            return priceNode.textContent.match(priceRegex)[1];
        } catch (e) {
            return '0.0';
        }
    }

    toPlainObject() {
        return {
            isbn: this.getISBN(),
            title: this.getTitle(),
            price: this.getPrice(),
            authors: this.getAuthors(),
            url: this.url
        }
    }
}
