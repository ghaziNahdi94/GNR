"use strict";

/****************************************************************************************
 * Storage Data keys
 ****************************************************************************************/
const hideStoriesKey = "hideStoriesKey";
const hideFriendSuggestionsKey = "hideFriendSuggestionsKey";
const hideAdsKey = "hideAdsKey";

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
class FacebookChoice {
  constructor(configurationKey, row, checkbox) {
    this.configurationKey = configurationKey;
    this.row = row;
    this.checkbox = checkbox;
    this.checkboxClicked = false;
    this.clickRowActivate();
  }

  clickRowActivate() {
    this.row.addEventListener("click", (event) => {
      if (!this.checkboxClicked.confirmation) {
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
  }
}
class DataConfigurations {
  configurations = {
    hideStoriesKey: false,
    hideFriendSuggestionsKey: false,
    hideAdsKey: false,
  };

  constructor(configurations) {
    this.configurations = configurations;
  }

  findConfigurationByKey(key) {
    for (const configuration of this.configurations) {
      if (configuration.key === key) {
        return this.configuration;
      }
    }
    return null;
  }

  saveConfigurationByKey(key, value) {
    this.configurations = {
      ...this.configurations,
      [key]: value,
    };

    this.saveConfiguration();
  }

  saveConfiguration() {
    GoogleStorage.save("config", this.configurations);
  }

  loadConfigurations(method) {
    const _this = this;

    GoogleStorage.onLoad("config", (result) => {
      _this.configurations = {
        hideStoriesKey: result?.config?.hideStoriesKey,
        hideFriendSuggestionsKey: result?.config?.hideFriendSuggestionsKey,
        hideAdsKey: result?.config?.hideAdsKey,
      };

      method({ ..._this.configurations });
    });
  }
}

/****************************************************************************************
 * Function
 ****************************************************************************************/

const setChoicesConfig = (dataConfiguration, choices) => {
  dataConfiguration.loadConfigurations((currentConfig) => {
    for (const choice of choices) {
      const isChecked = currentConfig[choice.configurationKey] || false;
      choice.setChecked(isChecked);
    }
  });
};

const addCheckboxListener = (
  dataConfiguration,
  storiesFacebookChoice,
  friendsSuggestionsFacebookChoice,
  adsFacebookChoice
) => {
  document.getElementById("hide-stories-row").onclick = () => {
    const checkbox = document.getElementById("hide-stories-checkbox");
    dataConfiguration.saveConfigurationByKey(
      storiesFacebookChoice.configurationKey,
      checkbox.checked
    );
  };

  document.getElementById("hide-friends-suggestions-row").onclick = () => {
    const checkbox = document.getElementById(
      "hide-friends-suggestions-checkbox"
    );
    dataConfiguration.saveConfigurationByKey(
      friendsSuggestionsFacebookChoice.configurationKey,
      checkbox.checked
    );
  };

  document.getElementById("ads-row").onclick = () => {
    const checkbox = document.getElementById("ads-checkbox");
    dataConfiguration.saveConfigurationByKey(
      adsFacebookChoice.configurationKey,
      checkbox.checked
    );
  };
};

/****************************************************************************************
 * Main
 ****************************************************************************************/
const dataConfiguration = new DataConfigurations({
  hideStoriesKey: false,
  hideFriendSuggestionsKey: false,
  hideAdsKey: false,
});

const hideStoriesRow = document.getElementById("hide-stories-row");
const hideStoriesCheckbox = document.getElementById("hide-stories-checkbox");
const storiesFacebookChoice = new FacebookChoice(
  hideStoriesKey,
  hideStoriesRow,
  hideStoriesCheckbox
);

const hideFriendsSuggestionsRow = document.getElementById(
  "hide-friends-suggestions-row"
);
const hideFriendsSuggestionsCheckbox = document.getElementById(
  "hide-friends-suggestions-checkbox"
);
const friendsSuggestionsFacebookChoice = new FacebookChoice(
  hideFriendSuggestionsKey,
  hideFriendsSuggestionsRow,
  hideFriendsSuggestionsCheckbox
);

const adsRow = document.getElementById("ads-row");
const adsCheckbox = document.getElementById("ads-checkbox");
const adsFacebookChoice = new FacebookChoice(hideAdsKey, adsRow, adsCheckbox);

setChoicesConfig(dataConfiguration, [
  storiesFacebookChoice,
  friendsSuggestionsFacebookChoice,
  adsFacebookChoice,
]);

addCheckboxListener(
  dataConfiguration,
  storiesFacebookChoice,
  friendsSuggestionsFacebookChoice,
  adsFacebookChoice
);
