import board from '../images/board.svg';
import FIELDS from "./boardFields";
import Dice from "./Dice";
import Piece from "./Piece";

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
        this.pieces = [];
        this.debug();
        this.confirmed = false;
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

    updatePieces(){
        this.pieces = [];
        this.game.state?.pieces?.forEach(piece => {
            let newPiece = new Piece(piece.color, piece.position)
            let option = this.game.state?.turn?.options.find(o => o.from === piece.position)
            if(option){
                if(this.confirmed){
                    const select = () => {
                        console.log('selected option', option);
                        this.dice.hide();
                        this.game.confirm(option.from);
                        this.confirmed = false;
                    }
                    newPiece.enable(option.to, select);
                }
            }
            this.pieces.push(
                newPiece
            )
        });
        // console.log('PIECES', this.pieces);
        this.main.querySelectorAll('.Piece').forEach(el => el.remove());
        this.pieces.forEach(piece => {
            this.main.appendChild(piece.render());
        })
    }

    move(){
        this.dice.show(this.game.state.turn?.number);
    }

    confirm() {
        // alert('CONFIRMED, OPTIONS: ' + this.game.state?.turn?.options);
        console.log(this.game.state?.turn?.options)
        this.confirmed = true;
        if(this.game.state?.turn?.options?.length > 0){
            this.game.refresh();
        }else{
            setTimeout(() => {
                this.dice.hide();
                this.game.confirm();
                this.confirmed = false;
            }, 600);
        }
    }

    confirmAFK() {
        this.dice.hide();
        this.confirmed = false;
    }
}


export default Board;
