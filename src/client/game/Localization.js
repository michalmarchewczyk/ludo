import LANGUAGES from "./languages";

class Localization {
    constructor(container) {
        this.container = container;
        this.lang = 'pl-PL';
        this.update(this.lang);
        setInterval(() => {
            this.refresh()
        }, 1000);
    }

    update(value){
        this.lang = value;
        console.log('SELECT LANG', value);
        this.refresh();
    }

    refresh(){
        this.container.querySelectorAll('.localized').forEach(el => {
            // console.log(el);
            if(!el.dataset.translation){
                el.dataset.translation = el.innerText;
            }
            let newValue = LANGUAGES[this.lang]?.[el.dataset.translation] ?? el.dataset.translation;
            el.innerText = newValue;
        })
    }

    translate(text){
        return LANGUAGES[this.lang]?.[text] ?? text;
    }
}

let localization = new Localization(document.body);

export default localization;
