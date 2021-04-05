'use strict';

/****************************************************************************************
 * Functions
 ****************************************************************************************/
 const hideHTMLElement = (element) => {
    if(element){
        const toHide = element[0] ? element[0] : element;
        toHide.style && putCssAttributeValue(toHide, "display", "none");
    } 
};

const putCssAttributeValue = (htmlElement, attribute, value) => {
    htmlElement.style[attribute] = value;
};

function getElementByXpath(path) {
    return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}
/****************************************************************************************
 * Main
 ****************************************************************************************/
var storiesClassName = "d2edcug0 e3xpq0al v8c10jal ejjq64ki";
var stories =  document.getElementsByClassName(storiesClassName);

hideHTMLElement(stories);

const getSuggestionsDiv = () => {
    const aTags = document.getElementsByTagName("span");
    const searchText = "Connaissez-vous...";
    let div = null;
    
    for (var i = 0; i < aTags.length; i++) {
      if (aTags[i].textContent == searchText) {
        div = aTags[i];
        break;
      }
    }

    return div?.parentElement?.parentElement?.parentElement?.parentElement;
}
setInterval(() => {
    const suggestionsDiv = getSuggestionsDiv();
    if(suggestionsDiv) {
        console.log(suggestionsDiv);
        hideHTMLElement(suggestionsDiv);
    }
}, 2000);