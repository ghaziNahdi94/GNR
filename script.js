'use strict';

/****************************************************************************************
 * Functions
 ****************************************************************************************/
 const hideHTMLElement = (element) => {
    if(element){
        const toHide = element[0] ? element[0] : element;
        console.log(toHide);
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

var friendsSuggestionsClassName = "q5bimw55 gvuykj2m rq0escxv j83agx80 nvd5e08m dlv3wnog rl04r1d5 d76ob5m9 eg9m0zos tu1s4ah4 cxgpxx05 rx6hrq12 fq9i8bis cvgtb6nh ofs802cu g0qnabr5 g2wf7z4h pohlnb88 dkue75c7 mb9wzai9 tu18w1b4";
var friendsSuggestions =  document.getElementsByClassName(friendsSuggestionsClassName);

hideHTMLElement(stories);
hideHTMLElement(friendsSuggestions);