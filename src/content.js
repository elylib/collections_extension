import {listenForQueryFromPopup} from "./util/BrowserAPI";
import {processIfMultiItemPage} from "./util/MultiItemPages";

processIfMultiItemPage();
listenForQueryFromPopup();