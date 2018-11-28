import {isbnRegex} from '../util/Regexes';
import {GenericScraper} from "./GenericScraper";

export class AmazonScraper extends GenericScraper {

    constructor( url) {
        super(url);
    }

    getISBN() {
        let table = document.getElementById('productDetailsTable');
        try {
            return table.textContent.match(isbnRegex)[0];
        } catch (e) {
            return '';
        }
    }

    getTitle() {
        try {
            return document.getElementById('productTitle').textContent.trim();
        } catch (e) {
            return '';
        }
    }

    getAuthors() {
        /*
         * Get the DOM nodes, convert it to an array, get the text and filter so it's only authors and
         * not extra cruft.
         */
        try {
            let byline = document.querySelectorAll('#bylineInfo a:not(.showMoreLink)');
            return Array.from(byline).map(this.nodeToString).filter(this.isAnAuthor).join(', ');
        } catch (e) {
            return '';
        }
    }

    nodeToString(node) {
        return node.textContent;
    }

    isAnAuthor(str) {
        return str && str.indexOf('Visit Amazon') === -1 && str.indexOf('search') === -1 && str.indexOf('Learn about') === -1;
    }

    getPrice() {
        let price = this.tryNewPrice();
        if (!price) {
            price = this.tryUsedPrice();
        }
        return this.extractPrice(price);
    }

    tryNewPrice() {
        let firstTry = document.getElementById('newOfferAccordionRow');
        return firstTry ? firstTry : document.getElementById('buyNewSection');
    }

    tryUsedPrice() {
        let firstTry = document.querySelector('#tmmSwatches .selected .olp-used');
        return firstTry ? firstTry : document.querySelector('#mediaOlp .olp-padding-right .a-color-price');
    }
}