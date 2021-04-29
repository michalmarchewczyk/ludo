import FIELDS from "./boardFields";
// const COLORS = {
//     red: '#f85d5d',
//     blue: '#3b87f8',
//     green: '#61f361',
//     yellow: '#eeee7b',
// }
const COLORS = {
    red: '#ff0000',
    blue: '#0000ff',
    green: '#00ff00',
    yellow: '#ffff00',
}


class Piece {
    constructor(color, position) {
        this.color = color;
        this.position = position;
        let field = FIELDS.find(f => f.name === this.position);
        this.element = document.createElement('div');
        this.element.classList.add('Piece');
        this.element.classList.add(this.color);
        this.element.style.left = field.x * 52.3 + 22 + 'px';
        this.element.style.top = field.y * 52.3 + 22 + 'px';
        this.element.style.background = COLORS[this.color];
        this.element.style.pointerEvents = 'none';
    }

    render(){
        return this.element;
    }


    enable(newPosition, select) {
        // console.log('ENABLE PIECE');
        this.element.style.pointerEvents = 'auto';
        this.element.classList.add('PieceEnabled');
        let field = FIELDS.find(f => f.name === newPosition);
        let placeholder = document.createElement('div');
        placeholder.classList.add('PiecePlaceholder');
        placeholder.classList.add(this.color);
        placeholder.style.left = ((field.x * 52.3 + 22) - parseFloat(this.element.style.left)) + 'px';
        placeholder.style.top = ((field.y * 52.3 + 22) - parseFloat(this.element.style.top)) + 'px';
        placeholder.style.background = COLORS[this.color];
        placeholder.style.pointerEvents = 'none';
        this.element.appendChild(placeholder);
        this.element.onclick = () => {
            select();
            this.element.onclick = null;
        }
    }

    disable(){
        this.element.style.pointerEvents = 'none';
    }
}

export default Piece;
