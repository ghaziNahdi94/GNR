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

/****************************************************************************************
 * Main
 ****************************************************************************************/
var storiesClassName = "d2edcug0 e3xpq0al v8c10jal ejjq64ki";
var stories =  document.getElementsByClassName(storiesClassName);

var friendsSuggestionsClassName = "c8r2yrt7 o7xrwllt ni8dbmo4 stjgntxs dy7m38rt jktsbyx5 l9j0dhe7 k4urcfbm";
var friendsSuggestions =  document.getElementsByClassName(friendsSuggestionsClassName);

hideHTMLElement(stories);
hideHTMLElement(friendsSuggestions);