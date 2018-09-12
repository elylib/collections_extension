import {AmazonScraper} from "../scrapers/AmazonScraper";
import {ChoiceScraper, showAmazonLink} from "../scrapers/ChoiceScraper";
import MLSScraper from "../scrapers/MLSScraper";
import {GenericScraper} from "../scrapers/GenericScraper";

function isChoiceReview(url) {
    return url.indexOf('choicereviews.org/review') !== -1;
}

function isAmazonProduct(url) {
    return url.match(/\/dp\/\w{10}/) || url.match(/\/gp\/product\/\w{10}/);
}

function isMidwestProduct(url) {
    return url.indexOf('v2016/Ordering/BookDetail') !== -1 || url.indexOf('v2016/Ordering/ExpressEntry') !== -1;
}

export function scraperFactory(curUrl) {
    let scraper;
    if (isAmazonProduct(curUrl)) {
        scraper = new AmazonScraper(curUrl);
    } else if (isChoiceReview(curUrl)) {
        scraper = new ChoiceScraper(curUrl);
        showAmazonLink(document, scraper.getISBN());
    } else if (isMidwestProduct(curUrl)) {
        scraper = new MLSScraper(curUrl);
    } else {
        scraper = new GenericScraper(curUrl);
    }
    return scraper;
}