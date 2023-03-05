'use strict';

/****************************************************************************************
 * Class
 ****************************************************************************************/
class GoogleStorage {
    static save(key, object) {
      chrome.storage.sync.set({ config: { ...this.configurations } });
      chrome.storage.sync.set({ [key]: { ...object } });
    }
  
    static onLoad(key, method) {
      chrome.storage.sync.get(key, (object) => {
        method(object);
      });
    }
  
    static displayConfigByKey(key) {
      GoogleStorage.onLoad(key, (config) => {
        console.log(config);
      });
    }
  }

class ElementStyle {
    constructor(element) {
        this.element = element;
    }

    putCssValueByAttribute(attribute, value) {
        this.element['style'] && (this.element['style'][attribute] = value);
    }
}

class ElementHider {
    static hide(element) {
        const style = new ElementStyle(element);
        if(style) {
            style.putCssValueByAttribute("display", "none");
        }
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

    static searchElementByQuerySelector(querySelector) {
        return new HtmlElement(document.querySelector(querySelector));
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
    let querySelector = '[aria-label="barre des stories"]';
    const stories = HtmlElementsSearcher.searchElementByQuerySelector(querySelector);
    ElementHider.hide(stories.element);

    querySelector = '[aria-label="Barre des reels"]';
    const reels = HtmlElementsSearcher.searchElementByQuerySelector(querySelector);
    ElementHider.hide(reels.element);
};

const hideReels = () => {
    let querySelector = '[aria-label="Reels"]';
    const reels = HtmlElementsSearcher.searchElementByQuerySelector(querySelector);
    ElementHider.hide(reels.element);
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
let configurations = null;

GoogleStorage.onLoad("config", (result) => {
    configurations = {
      hideStoriesKey: result?.config?.hideStoriesKey,
      hideReelsKey: result?.config?.hideReelsKey,
      hideFriendSuggestionsKey: result?.config?.hideFriendSuggestionsKey,
      hideAdsKey: result?.config?.hideAdsKey,
    };

    configurations?.hideStoriesKey && hideStories();
    configurations?.hideReelsKey && hideReels();
    configurations?.hideFriendSuggestionsKey && hideFriendsSuggestions();
    configurations?.hideAdsKey && hideAds();

    setInterval(() => {
        configurations?.hideStoriesKey && hideStories();
        configurations?.hideReelsKey && hideReels();
        configurations?.hideFriendSuggestionsKey && hideFriendsSuggestions();
        configurations?.hideAdsKey && hideAds();
    }, 3000);
}); 