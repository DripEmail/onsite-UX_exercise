define(['hyper-html'], function (hyperHTML) {
   const win = this
   return class CustomSelect {
        constructor(config) {
            this.isOpen = false;
            this.selectedOption = config.selectedOption || { };
            this.config = config;

        }
        toggleDropdown() {
            this.isOpen = !this.isOpen;
            win.render()
        }
        selectOption(event) {
            this.selectedOption = this.config.options.find(option => event.target.value == option.value)
        }
        render() {
            const selectOptions = this.config.options.map((option) => {
                let selected = option.value == this.selectedOption.value;
                return hyperHTML.wire()`
                    <button id=${option.value} selected=${selected} value=${option.value} onclick=${option.action || this.selectOption.bind(this)}>
                        ${option.text}
                    </button>`
            })
            return hyperHTML.wire()`
                <custom-select onclick=${this.toggleDropdown.bind(this)} id = ${this.config.id} class=${this.isOpen && 'is-active'}>
                    <custom-select-input>
                        <ui-label id="custom-select-label">${this.selectedOption.value || 'Please select...'}</ui-label>
                        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M9.53033 0.46967C9.23744 0.176777 8.76256 0.176777 8.46967 0.46967L5 3.93934L1.53033 0.46967C1.23744 0.176777 0.762563 0.176777 0.46967 0.46967C0.176777 0.762563 0.176777 1.23744 0.46967 1.53033L4.46967 5.53033C4.61032 5.67098 4.80109 5.75 5 5.75C5.19891 5.75 5.38968 5.67098 5.53033 5.53033L9.53033 1.53033C9.82322 1.23744 9.82322 0.762563 9.53033 0.46967Z" fill="#09112B"/>
                        </svg>
                    </custom-select-input>
                    <select-options class=${this.isOpen && 'is-open'}>
                        ${selectOptions}
                    </select-options>
                </custom-select>`;
        }
    }
});
