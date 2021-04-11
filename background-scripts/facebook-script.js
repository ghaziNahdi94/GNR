'use strict';

/****************************************************************************************
 * Class
 ****************************************************************************************/
class ElementStyle {
    constructor(element) {
        this.element = element;
    }

    putCssValueByAttribute(attribute, value) {
        this.element.style[attribute] = value;
    }
}

class ElementHider {
    static hide(element) {
        const style = new ElementStyle(element);
        element.style && style.putCssValueByAttribute("display", "none");
    }

    static hideElements(elements) {
        for(const element of elements) {
            ElementHider.hide(element);
        }
    }
}

class HtmlElementsSearcher {
    static searchElementsByClassName(className) {
        return new HtmlElement(document.getElementsByClassName(className));
    }

    static searchElementByClassName(className, index) {
        const elements = HtmlElementsSearcher.searchElementsByClassName(className);
        return elements && elements.element[index] ? new HtmlElement(elements.element[index]) : null;
    }

    static searchElementsTagByContentText(tag, textContent) {
        const result = [];

        const tagElements = document.getElementsByTagName(tag);
        for(const element of tagElements) {
            if(element.textContent === textContent) {
                result.push(new HtmlElement(element));
            }
        }
        return result;
    }
}

class HtmlElement {
    constructor(element) {
        this.element = element;
    }

    getParent() {
        const parent = this.element.parentElement;
        return parent ? new HtmlElement(parent) : null;
    }

    getOrderParent(order) {
        if(order <= 0){
            return this;
        }

        let index = 1;
        let parent = this.getParent();
        while(index < order && parent.element) {
            parent = parent.getParent();
            index++;
        }

        return parent;
    }
}

/****************************************************************************************
 * Function
 ****************************************************************************************/
const hideStories = () => {
    var storiesClassName = "d2edcug0 e3xpq0al v8c10jal ejjq64ki";
    const stories = HtmlElementsSearcher.searchElementByClassName(storiesClassName, 0);
    ElementHider.hide(stories.element);
};

const hideFriendsSuggestions  = () => {
    const tagSearch = "span";
    const searchText = "Connaissez-vous...";
    const friendsSuggestions = HtmlElementsSearcher.searchElementsTagByContentText(tagSearch, searchText);
    const elementsToHide = friendsSuggestions.map(htmlElement => htmlElement.getParent()?.getParent()?.getParent()?.getParent()?.element);
    ElementHider.hideElements(elementsToHide);
};

const hideAds = () => {
    var className = "b6zbclly myohyog2 l9j0dhe7 aenfhxwr l94mrbxd ihxqhq3m nc684nl6 t5a262vz sdhka5h4";
    const htmlElements = HtmlElementsSearcher.searchElementsByClassName(className);
    for(const element of htmlElements.element) {
        if(element.textContent === "S") {
            const htmlElement = new HtmlElement(element);
            const toHide = htmlElement.getOrderParent(11);
            if(toHide.element.classList.length === 0) {
                ElementHider.hide(toHide.element);
            }
        }
    }
};

/****************************************************************************************
 * Main
 ****************************************************************************************/
 hideStories();
 hideFriendsSuggestions();
 hideAds();

setInterval(() => {
    hideStories();
    hideFriendsSuggestions();
    hideAds();
}, 3000);