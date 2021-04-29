import ControlElement from "./ControlElement";
import Board from "./Board";

class Game {
    constructor({name ,playerId }) {
        if(name){
            this.name = name;
            this.connect();
        }else if(playerId){
            this.playerId = playerId;
            this.load();
        }
        this.state = null;
        this.container = document.createElement('div');
        this.container.classList.add('gameContainer');
        this.controlElement = new ControlElement(this.setReady.bind(this));
        this.container.appendChild(this.controlElement.render());
        this.board = new Board(this);
        this.container.appendChild(this.board.render());
    }

    render() {
        return this.container;
    }

    connect() {
        fetch('/api/connect', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name: this.name})
        })
            .then(res => res.json())
            .then(data => {
                this.playerId = data.playerId;
                this.gameId = data.gameId;
                console.log(this);
                this.createSocket();
            })
            .catch(e => {
                console.log(e);
            })
    }

    load() {
        fetch('/api/load', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({playerId: this.playerId})
        })
            .then(res => res.json())
            .then(data => {
                this.name = data.name;
                this.gameId = data.gameId;
                console.log(this)
                this.createSocket();
            })
            .catch(e => {
                console.log(e);
            })
    }


    createSocket() {
        this.refresh();
        this.socket = setInterval(() => {
            // console.log('refresh');
            this.refresh();
        }, 500);
    }

    refresh() {
        fetch('/api/get', {
            method: "GET",
            headers: {'Content-Type': 'application/json'},
        })
            .then(res => res.json())
            .then(data => {
                if(!this.state?.win && data.win){
                    console.log('WINNER: ' + data.win.color);
                    alert('WINNER: ' + data.win.color);
                }
                if(!(this.state?.started) && data.started === true){
                    this.start();
                }
                if(!(this.state?.turn?.player.id === this.playerId) && data.turn?.player?.id === this.playerId){
                    this.state = data;
                    this.updateUI();
                    this.move();
                }
                if(this.state?.turn?.player?.id === this.playerId && data.turn?.player?.id !== this.playerId){
                    this.board.confirmAFK();
                }
                this.state = data;
                // console.log(data)
                this.updateUI();
            })
            .catch(e => {
                console.log(e);
            })
    }


    updateUI() {
        this.controlElement.update(this.state);
        this.board.updatePieces();
    }

    setReady(ready) {
        fetch('/api/ready', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ready})
        })
            .then(res => res.json())
            .then(data => {
                this.refresh();
            })
            .catch(e => {
                console.log(e);
            })
    }

    start() {
        // alert('STARTED');
        this.board.show();
    }


    move(){
        console.log(this.state);
        this.board.move();
        // alert('YOUR MOVE: ' + this.state?.turn?.number);
    }

    confirm(from) {
        fetch('/api/confirm', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({from: from ?? null})
        })
            .then(res => res.json())
            .then(data => {
                this.refresh();
            })
            .catch(e => {
                console.log(e);
            })
    }
}


export default Game;
