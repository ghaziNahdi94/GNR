'use strict';

/****************************************************************************************
 * Storage Data keys
 ****************************************************************************************/
const hideStoriesKey = "hideStoriesKey";
const hideFriendSuggestionsKey = "hideFriendSuggestionsKey";
const hideAdsKey = "hideAdsKey";

/****************************************************************************************
 * Class
 ****************************************************************************************/
class FacebookChoice {
    constructor(dataConfigurations, configurationKey, row, checkbox) {
        this.dataConfigurations = dataConfigurations;
        this.configurationKey = configurationKey;
        this.row = row;
        this.checkbox = checkbox;
        this.checkboxClicked = false;
        this.clickRowActivate();
    }

    clickRowActivate() {
        this.row.addEventListener("click", (event) => {
            if(!this.checkboxClicked.confirmation) {
                this.setChecked(!this.checkbox.checked);
            }
            this.checkboxClicked = false;
        });
        
        this.checkbox.addEventListener("click", (event) => {
            this.checkboxClicked = true;
        });
    }

    setChecked(isChecked) {
        this.checkbox.checked = isChecked;
        this.dataConfigurations.saveConfiguration(this.configurationKey, isChecked);
    }
}
class DataConfigurations {
    configurations = {};

    constructor(configurations) {
        this.configurations = configurations;
    }

    findConfigurationByKey(key) {
        for(let i=0; i<this.configurations.length; i++) {
            if(this.configurations[i].key === key) {
                return this.configurations[i];
            }
        }
        return null;
    }

    saveConfiguration(key, value) {
        this.configurations[key] = value;
        chrome.storage.sync.set(this.configurations);
    }

    loadConfigurations() {
        const _this = this;
        chrome.storage.sync.get([], function(result) {
            _this.configurations = result;
            console.log(result);
        });

        setInterval(() => console.log(this.configurations), 5000);
    }
}

/****************************************************************************************
 * Function
 ****************************************************************************************/
const initFacebookChoiceValueByKey = (dataConfigurations, facebookChoice, key) => {
    dataConfigurations.loadConfigurations();
    //console.log(dataConfigurations.configurations);
    
};

const init = (dataConfigurations) => {
    initFacebookChoiceValueByKey(dataConfigurations, storiesFacebookChoice, hideStoriesKey)
    initFacebookChoiceValueByKey(dataConfigurations, friendsSuggestionsFacebookChoice, hideFriendSuggestionsKey)
    initFacebookChoiceValueByKey(dataConfigurations, adsFacebookChoice, hideAdsKey)
};

/****************************************************************************************
 * Main
 ****************************************************************************************/
const dataConfigurations = new DataConfigurations({hideStoriesKey: false, hideFriendSuggestionsKey: false, hideAdsKey: false});

const hideStoriesRow = document.getElementById("hide-stories-row");
const hideStoriesCheckbox = document.getElementById("hide-stories-checkbox");
const storiesFacebookChoice = new FacebookChoice(dataConfigurations, hideStoriesKey, hideStoriesRow, hideStoriesCheckbox);

const hideFriendsSuggestionsRow = document.getElementById("hide-friends-suggestions-row");
const hideFriendsSuggestionsCheckbox = document.getElementById("hide-friends-suggestions-checkbox");
const friendsSuggestionsFacebookChoice = new FacebookChoice(dataConfigurations, hideFriendSuggestionsKey, hideFriendsSuggestionsRow, hideFriendsSuggestionsCheckbox);

const adsRow = document.getElementById("ads-row");
const adsCheckbox = document.getElementById("ads-checkbox");
const adsFacebookChoice = new FacebookChoice(dataConfigurations, hideAdsKey, adsRow, adsCheckbox);

init(dataConfigurations);
