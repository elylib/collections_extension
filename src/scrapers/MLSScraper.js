import {isbnRegex, mlsAuthorsRegex} from '../util/Regexes';
import {GenericScraper} from "./GenericScraper";

export default class MLSScraper extends GenericScraper {

    constructor(url) {
        super(url);
        this.titleAndAuthor = document.querySelector('[id$="TitleAuthorImprint"]');
        this.isbnAndPrice = document.querySelector('[id$="ISBNs"]');
    }

    getISBN() {
        try {
            return this.isbnAndPrice.textContent.match(isbnRegex)[0];
        } catch (e) {
            return '';
        }
    }

    getTitle() {
        try {
            let title = this.titleAndAuthor.getElementsByClassName('bold')[0];
            return title.textContent.trim();
        } catch (e) {
            return '';
        }
    }

    getAuthors() {
        try {
            let authors = this.titleAndAuthor.textContent;
            return authors.match(mlsAuthorsRegex)[1];
        } catch (e) {
            return '';
        }
    }

    getPrice() {
        return this.extractPrice(this.isbnAndPrice);
    }
}
