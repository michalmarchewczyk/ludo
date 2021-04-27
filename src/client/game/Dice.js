import dice1 from '../images/dice1.svg';
import dice2 from '../images/dice2.svg';
import dice3 from '../images/dice3.svg';
import dice4 from '../images/dice4.svg';
import dice5 from '../images/dice5.svg';
import dice6 from '../images/dice6.svg';

class Dice {
    constructor(next) {
        this.container = document.createElement('div');
        this.container.classList.add('Dice');
        this.container.style.display = 'none';
        this.container.style.background = "none";
        this.diceButton = document.createElement('button');
        this.diceButton.innerText = `RZUT KOSTKĄ`;
        this.container.appendChild(this.diceButton);
        this.next = next;
        this.value = 0;
        this.diceButton.onclick = () => {
            this.display();
            this.next();
        }
        // this.container.style.background = `url(${dice6})`;
    }

    render(){
        return this.container;
    }

    show(value){
        this.container.style.display = "block";
        this.value = value;
    }

    display(){
        this.container.style.background = `url(${
            ['', dice1, dice2, dice3, dice4, dice5, dice6][this.value]
        })`;
    }

    hide(){
        this.container.style.display = "none";
        this.container.style.background = "none";
    }
}

export default Dice;
