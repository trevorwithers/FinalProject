/**
 * The options object contains the data, methods, and lifecycle hooks for the Vue app.
 */
let options = {
    /**
     * The data object contains the data that is used in the Vue app.
     */
    data: () => {
        return {
            currentDate: '',
            title: "D&D 5e API",
            index: "",
            spells: [],
            spellDetails: [],
            monsters: [],
            monsterDetails: [],
            headings: [],
            startIndex: 0,
            endIndex: 10,
            count: 1,
            names: [],
            spellContent: false,
            monsterContent: false,
            optionContent: true,
            errorMessage: "",
        }
    },
    /**
     * The created() function is called when the Vue app is created. It is used to fetch the data from the API.
     */
    async created() {
        await this.updateCurrentDate();
    },
    /**
     * The methods object contains the functions that are called when the user interacts with the app.
     */
    methods: {
        /**
         * The fetchSpell() function is used to fetch the spells from the API.
         */
        async fetchSpell() {
            this.spellDetails = [];
            try {
                let response = await fetch(
                    "https://www.dnd5eapi.co/api/spells/"
                );
                this.index = "";
                let json = await response.json();
                this.spells = [];
                for (let i = this.startIndex; i < this.endIndex; i++) {
                    this.spells.push(json.results[i]);
                }
                this.headings = Object.keys(this.spells[0]).map(key => {
                    return key.charAt(0).toUpperCase() + key.slice(1).toLowerCase();
                });
            } catch (error) {
                this.errorMessage = error.message;
            }
        },
        /**
         * The fetchSpellByName() function is used to fetch the details of a spell from the API.
         */
        async fetchSpellByName(index) {
            this.spells = [];
            this.startIndex = 0;
            this.endIndex = 10;
            this.index = index;
            try {
                let response = await fetch(
                    "https://www.dnd5eapi.co/api/spells/" + index
                );
                let json = await response.json();
                this.spellDetails = [];
                this.spellDetails.push(json);
            } catch (error) {
                this.errorMessage = error.message;
            }
        },
        /**
         * The fetchMonster() function is used to fetch all of the monsters from the API.
         */
        async fetchMonster() {
            this.monsterDetails = [];
            try {
                let response = await fetch(
                    "https://www.dnd5eapi.co/api/monsters"
                );
                this.index = "";
                let json = await response.json();
                this.monsters = [];
                for (let i = this.startIndex; i < this.endIndex; i++) {
                    this.monsters.push(json.results[i]);
                }
                this.headings = Object.keys(this.monsters[0]).map(key => {
                    return key.charAt(0).toUpperCase() + key.slice(1).toLowerCase();
                });
            } catch (error) {
                this.errorMessage = error.message;
            }
        },
        /**
         * The fetchMonsterByName() function is used to fetch the details of a monster from the API.
         */
        async fetchMonsterByName(index) {
            this.monsters = [];
            this.startIndex = 0;
            this.endIndex = 10;
            this.index = index;
            try {
                let response = await fetch(
                    "https://www.dnd5eapi.co/api/monsters/" + index
                );
                let json = await response.json();
                this.monsterDetails = [];
                this.monsterDetails.push(json);
                // The following code is to handle the case where the API returns an empty array for the special_abilities, actions, and legendary_actions fields
                // The code adds default values to the fields so that Vue does not throw an error when trying to access the fields
                if (!this.monsterDetails[0].special_abilities || this.monsterDetails[0].special_abilities.length <= 0) {
                    this.monsterDetails[0].special_abilities = [];
                }
                if (!this.monsterDetails[0].actions || this.monsterDetails[0].actions.length <= 0) {
                    this.monsterDetails[0].actions = [];
                }
                if (!this.monsterDetails[0].legendary_actions || this.monsterDetails[0].legendary_actions.length <= 0) {
                    this.monsterDetails[0].legendary_actions = [];
                }
                // The following for loops are to handle the case where the API returns an empty array for special_abilities, actions, and legendary_actions fields
                // The for loops add default values to the fields so that Vue does not throw an error when trying to access the fields
                for (let j = 0; j < this.monsterDetails[0].special_abilities.length; j++) {
                    if (!this.monsterDetails[0].special_abilities[j].dc || this.monsterDetails[0].special_abilities[j].dc.length <= 0) {
                        this.monsterDetails[0].special_abilities[j].dc = { dc_type: { name: "" } };
                    }
                }
                for (let j = 0; j < this.monsterDetails[0].actions.length; j++) {
                    if (!this.monsterDetails[0].actions[j].actions || this.monsterDetails[0].actions[j].actions.length <= 0) {
                        this.monsterDetails[0].actions[j].actions = [];
                    }
                    if (!this.monsterDetails[0].actions[j].damage || this.monsterDetails[0].actions[j].damage.length <= 0) {
                        this.monsterDetails[0].actions[j].damage = [];
                    }
                    if (!this.monsterDetails[0].actions[j].dc || this.monsterDetails[0].actions[j].dc.length <= 0) {
                        this.monsterDetails[0].actions[j].dc = [];
                    }
                    if (!this.monsterDetails[0].actions[j].usage || this.monsterDetails[0].actions[j].usage.length <= 0) {
                        this.monsterDetails[0].actions[j].usage = { times: 0, type: "" };
                    }
                }
                for (let j = 0; j < this.monsterDetails[0].legendary_actions.length; j++) {
                    if (!this.monsterDetails[0].legendary_actions[j].actions || this.monsterDetails[0].legendary_actions[j].actions.length <= 0) {
                        this.monsterDetails[0].legendary_actions[j].actions = [];
                    }
                    if (!this.monsterDetails[0].legendary_actions[j].damage || this.monsterDetails[0].legendary_actions[j].damage.length <= 0) {
                        this.monsterDetails[0].legendary_actions[j].damage = [];
                    }
                    if (!this.monsterDetails[0].legendary_actions[j].dc || this.monsterDetails[0].legendary_actions[j].dc.length <= 0) {
                        this.monsterDetails[0].legendary_actions[j].dc = [];
                    }
                    if (!this.monsterDetails[0].legendary_actions[j].usage || this.monsterDetails[0].legendary_actions[j].usage.length <= 0) {
                        this.monsterDetails[0].legendary_actions[j].usage = [];
                    }
                }
            } catch (error) {
                this.errorMessage = error.message;
            }
        },
        /**
         * The first() function is used to navigate to the first page of the content.
         */
        async first() {
            this.startIndex = 0;
            this.endIndex = 10;
            await this.fethcContent();
        },
        /**
         * The prev() function is used to navigate to the previous page of the content.
         */
        async prev() {
            if (this.startIndex > 0) {
                this.startIndex = this.startIndex - 10;
                this.endIndex = this.endIndex - 10;
                await this.fethcContent();
            }
        },
        /**
         * The next() function is used to navigate to the next page of the content.
         */
        async next() {
            if (this.endIndex < this.count) {
                this.startIndex = this.startIndex + 10;
                this.endIndex = this.endIndex + 10;
            } else {
                this.startIndex = this.count - 10;
                this.endIndex = this.count;
            }
            await this.fethcContent();
        },
        /**
         * The last() function is used to navigate to the last page of the content.
         */
        async last() {
            this.startIndex = this.count - 10;
            this.endIndex = this.count;
            this.fethcContent();
        },
        /**
         * The updateCurrentDate() function is used to update the current date.
         */
        updateCurrentDate() {
            const date = new Date();
            this.currentDate = date;
        },
        /**
         * The formatDate() function is used to format the date.
         * @param {string} date - The date to be formatted.
        */
        formatDate(date) {
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            return new Date(date).toLocaleDateString(undefined, options);
        },
        /**
         * The showSpellsPage() function is used to show the spells page.
        */
        async showSpellsPage() {
            this.title = "D&D 5e Spells";
            let response = await fetch(
                "https://www.dnd5eapi.co/api/spells"
            );
            let json = await response.json();
            this.count = json.count;
            this.names = [];
            for (let i = 0; i < this.count; i++) {
                this.names.push({ name: json.results[i].name, index: json.results[i].index });
            }
            this.spellContent = true;
            this.monsterContent = false;
            this.optionContent = false;
        },
        /**
         * The showMonstersPage() function is used to show the monsters page.
         */
        async showMonstersPage() {
            this.title = "D&D 5e Monsters";
            let response = await fetch(
                "https://www.dnd5eapi.co/api/monsters"
            );
            let json = await response.json();
            this.count = json.count;
            this.names = [];
            for (let i = 0; i < this.count; i++) {
                this.names.push({ name: json.results[i].name, index: json.results[i].index });
            }
            this.monsterDetails = [];
            this.monsters = [];
            this.spellContent = false;
            this.monsterContent = true;
            this.optionContent = false;
        },
        /**
         * The showOptionPage() function is used to show the option page.
         */
        async showOptionPage() {
            this.title = "D&D 5e API";
            this.spellContent = false;
            this.monsterContent = false;
            this.optionContent = true;
        },
        /**
         * The fethcContent() function is used to fetch the content.
         */
        async fethcContent() {
            if (this.spellContent) {
                await this.fetchSpell();
            } else if (this.monsterContent) {
                await this.fetchMonster();
            }
        }
    },
}
// Create the Vue app
let app = Vue.createApp(options).mount("#app");