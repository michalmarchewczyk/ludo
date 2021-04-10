"use strict";
import './styles/main.scss';

import Game from "./game/Game";

const container = document.createElement('div');
container.classList.add('container');
document.body.appendChild(container);

const runNewGame = () => {
    const namePopup = document.createElement('div');
    namePopup.classList.add('namePopup');
    namePopup.innerHTML = `
        <form>
            <label>
                <span>Twój nick:</span>
                <input type="text" id="nameInput">
            </label>
            <input type="submit" value="OK">
        </form>
    `;
    namePopup.children[0].onsubmit = (e) => {
        e.preventDefault();
        let name = document.querySelector('#nameInput').value;
        startGame(name);
    }
    container.appendChild(namePopup);
};

const startGame = (name) => {
    container.innerHTML = '';
    const game = new Game({name});
}

const loadGame = (gameId, playerId, name) => {
    container.innerHTML = '';
    const game = new Game({playerId});
}


const init = () => {
    fetch('/api/connect', {
        method: 'GET'
    })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data.msg === 'new'){
                runNewGame();
            }else{
                loadGame(data.gameId, data.playerId, name);
            }
        })
        .catch(e => {
            console.log(e);
        })
}

init();