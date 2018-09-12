export const wishlistAuthorsRegex = /by (.*) \(/;

export const wishlistIsbnRegex =  /dp\/(.*)\//;

export const isbnRegex = /(?=[0-9X]{10}|(?=(?:[0-9]+[- ]){3})[- 0-9X]{13}|97[89]-?[0-9]{10}|(?=(?:[0-9]+[- ]){4})[- 0-9]{17})(?:97[89][- ]?)?[0-9]{1,5}[- ]?[0-9]+[- ]?[0-9]+[- ]?[0-9X]/;

export const priceRegex = /\$ ?(\d+\.\d{2})/;

export const mlsAuthorsRegex = /\/ ?(.+)--/;

export const mlsFundRegex = /Fund: ([A-Z]{2,4}) Order/;
