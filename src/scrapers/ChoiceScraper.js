import {isbnRegex} from '../util/Regexes';
import {GenericScraper} from "./GenericScraper";

export function showAmazonLink(isbn) {
    let newLI = document.createElement('li');
    let link = document.createElement('a');
    link.setAttribute('href', 'https://amazon.com/s/?field-keywords="' + encodeURIComponent(isbn) + '"');
    link.textContent = 'Search on Amazon';
    newLI.appendChild(link);
    document.querySelector('#selectedReviewsForm .review-summary ul').appendChild(newLI);
}

export class ChoiceScraper extends GenericScraper {

    constructor(url) {
        /*
         * Author and price are too inconsistent or not accurate
         */
        super(url);
    }

    getISBN() {
        try {
            let isbnText = document.querySelector('.review-summary ul:first-of-type li:first-child').textContent;
            return isbnText.match(isbnRegex)[0];
        } catch (e) {
            return '';
        }
    }

    getTitle() {
        try {
            return document.querySelector('#selectedReviewsForm h1').textContent.trim();
        } catch (e) {
            return '';
        }
    }
}
