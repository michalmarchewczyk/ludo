import Game from "./game/Game";
import localization from "./game/Localization";

class App {
    constructor(container) {
        this.container = container;
        this.container.classList.add('container');
        this.localization = localization;
        let selectLang = document.createElement('select');
        selectLang.id = 'selectLang';
        selectLang.innerHTML = `
            <option value="pl-PL">PL</option>
            <option value="en-US">EN</option>
        `;
        selectLang.onchange = (e) => {
            this.localization.update(selectLang.value);
        }
        document.body.appendChild(selectLang);
    }


    runNewGame() {
        const namePopup = document.createElement('div');
        namePopup.classList.add('namePopup');
        namePopup.innerHTML = `
        <form>
            <label>
                <span class="localized">nickname</span>
                <input type="text" id="nameInput">
            </label>
            <input type="submit" value="OK">
        </form>
        `;
        namePopup.children[0].onsubmit = (e) => {
            e.preventDefault();
            if(document.querySelector('#nameInput').value === '') return;
            let name = document.querySelector('#nameInput').value;
            this.startGame(name);
        }
        this.container.appendChild(namePopup);
        this.localization.refresh();
    };

    startGame(name) {
        this.container.innerHTML = '';
        const game = new Game({name});
        console.log(game.render())
        this.container.appendChild(game.render());
    }

    loadGame(gameId, playerId, name) {
        this.container.innerHTML = '';
        const game = new Game({playerId});
        console.log(game.render())
        this.container.appendChild(game.render());
    }


    init() {
        fetch('/api/connect', {
            method: 'GET'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if(data.msg === 'new'){
                    this.runNewGame();
                }else{
                    this.loadGame(data.gameId, data.playerId, name);
                }
            })
            .catch(e => {
                console.log(e);
            })
    }
}


export default App;
