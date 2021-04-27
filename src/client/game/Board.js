import board from '../images/board.svg';
import FIELDS from "./boardFields";
import Dice from "./Dice";

class Board {
    constructor(game) {
        this.game = game;
        this.container = document.createElement('div');
        this.container.classList.add('Board');
        this.main = document.createElement('div');
        this.main.classList.add('BoardMain');
        this.main.style.backgroundImage = `url(${board})`;
        this.container.appendChild(this.main);
        this.container.style.display = 'none';
        this.fields = FIELDS;
        this.dice = new Dice(this.confirm.bind(this));
        this.container.appendChild(this.dice.render());
        this.debug();
    }

    render(){
        return this.container;
    }

    show(){
        this.container.style.display = 'block';
    }

    debug() {
        this.debugElement = document.createElement('div');
        this.main.appendChild(this.debugElement);
        this.fields.forEach(field => {
            let el = document.createElement('div');
            el.classList.add('BoardDebug');
            el.style.left = field.x * 52 + 22 + 'px';
            el.style.top = field.y * 52 + 22 + 'px';
            el.innerText = field.name;
            this.debugElement.appendChild(el);
        });
    }

    move(){
        this.dice.show(this.game.game.turn?.number);
    }

    confirm() {
        setTimeout(() => {
            this.dice.hide();
            this.game.confirm();
        }, 600);
    }
}


export default Board;
