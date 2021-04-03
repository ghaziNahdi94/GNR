'use strict';

/****************************************************************************************
 * Class
 ****************************************************************************************/
class FacebookChoice {
    constructor(row, checkbox) {
        this.row = row;
        this.checkbox = checkbox;
        this.checkboxClicked = false;
        this.clickRowActivate();
    }

    clickRowActivate() {
        this.row.addEventListener("click", (event) => {
            if(!this.checkboxClicked.confirmation) {
                this.checkbox.checked = !this.checkbox.checked;
            }
            this.checkboxClicked = false;
        });
        
        this.checkbox.addEventListener("click", (event) => {
            this.checkboxClicked = true;
        });
    }
}

/****************************************************************************************
 * Main
 ****************************************************************************************/
const hideStoriesRow = document.getElementById("hide-stories-row");
const hideStoriesCheckbox = document.getElementById("hide-stories-checkbox");
const storiesFacebookChoice = new FacebookChoice(hideStoriesRow, hideStoriesCheckbox);

const hideFriendsSuggestionsRow = document.getElementById("hide-friends-suggestions-row");
const hideFriendsSuggestionsCheckbox = document.getElementById("hide-friends-suggestions-checkbox");
const friendsSuggestionsFacebookChoice = new FacebookChoice(hideFriendsSuggestionsRow, hideFriendsSuggestionsCheckbox);
