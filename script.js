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

var friendsSuggestionsClassName = "dati1w0a e5nlhep0 hv4rvrfc pybr56ya i1fnvgqd btwxx1t3 j83agx80";
var friendsSuggestions =  document.getElementsByClassName(friendsSuggestionsClassName);
console.log(friendsSuggestions);
for(let i=0; i<friendsSuggestions.length; i++){
    console.log(i + friendsSuggestions[i]);
    hideHTMLElement(friendsSuggestions[i]);
}

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
}, 10000);