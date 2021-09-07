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
        this.dataConfigurations.saveConfigurationByKey(this.configurationKey, isChecked);
    }
}
class DataConfigurations {
    configurations = {hideStoriesKey: false, hideFriendSuggestionsKey: false, hideAdsKey: false};

    constructor(configurations) {
        this.configurations = configurations;
    }

    findConfigurationByKey(key) {
        for(const configuration of this.configurations){
            if(configuration.key === key) {
                return this.configuration;
            }
        }
        return null;
    }

    saveConfigurationByKey(key, value) {
        this.configurations = {
            ...this.configurations,
            [key]: value
        };

        this.saveConfiguration();
    }

    saveConfiguration() {
        chrome.storage.sync.set({config: {...this.configurations}});
    }

    loadConfigurations() {
        const _this = this;
        setInterval(() => {
            chrome.storage.sync.get("config", function(result) {
                if(Object.entries(result).length === 0){
                    _this.saveConfiguration();
                } else {
                    _this.configurations = {
                        hideStoriesKey: result?.config?.hideStoriesKey, 
                        hideFriendSuggestionsKey: result?.config?.hideFriendSuggestionsKey, 
                        hideAdsKey: result?.config?.hideAdsKey
                    };
                }

                console.log(_this.configurations);
            });
        }, 5000);
    }
}

/****************************************************************************************
 * Function
 ****************************************************************************************/
const initFacebookChoiceValueByKey = (dataConfigurations, facebookChoice, key) => {
};

const init = (dataConfiguration) => {
    dataConfiguration.loadConfigurations();
};

/****************************************************************************************
 * Main
 ****************************************************************************************/
const dataConfiguration = new DataConfigurations({hideStoriesKey: false, hideFriendSuggestionsKey: false, hideAdsKey: false});

const hideStoriesRow = document.getElementById("hide-stories-row");
const hideStoriesCheckbox = document.getElementById("hide-stories-checkbox");
const storiesFacebookChoice = new FacebookChoice(dataConfiguration, hideStoriesKey, hideStoriesRow, hideStoriesCheckbox);

const hideFriendsSuggestionsRow = document.getElementById("hide-friends-suggestions-row");
const hideFriendsSuggestionsCheckbox = document.getElementById("hide-friends-suggestions-checkbox");
const friendsSuggestionsFacebookChoice = new FacebookChoice(dataConfiguration, hideFriendSuggestionsKey, hideFriendsSuggestionsRow, hideFriendsSuggestionsCheckbox);

const adsRow = document.getElementById("ads-row");
const adsCheckbox = document.getElementById("ads-checkbox");
const adsFacebookChoice = new FacebookChoice(dataConfiguration, hideAdsKey, adsRow, adsCheckbox);

init(dataConfiguration);
