const PATHS = require('./paths');

const uuid = require('uuid');

const TURN_TIME = 30;

class Game {
    constructor() {
        this.id = uuid.v4();
        this.started = false;
        this.players = [];
        this.pieces = [];
        this.turn = null;
        this.pending = null;
        this.pieces = [];
        this.win = null;
    }

    addPlayer(player) {
        this.players.push(player);
    }

    get(playerId) {
        let gameInfo = {
            id: this.id,
            started: this.started,
            players: this.players,
            currentPlayer: this.players.find(p => p.id === playerId),
            turn: this.turn,
            pending: this.pending,
            waiting: TURN_TIME - Math.floor(
                (this.pending ? Date.now() - this.pending : 0) / 1000
            ),
            pieces: this.pieces,
            win: this.win,
        }
        this.refresh();
        return gameInfo;
    }

    checkReady(){
        if(
            (
                (this.players.length >= 2
                && this.players.filter(p => p.ready).length === this.players.length)
                || this.players.length === 4)
            && !this.started){
            this.start();
        }
    }

    start() {
        console.log('START');
        this.initPieces();
        this.started = true;
        this.nextMove();
    }

    nextMove(){
        let nextPlayer = this.players[
            ((this.players.findIndex(p => p.id === this.turn?.player?.id) ?? -1) + 1) % this.players.length
            ];
        let number = Math.floor(Math.random() * (7 - 1)) + 1;
        // let number = Math.floor(Math.random() * (3 - 1)) + 1;
        let options = [];
        let color = nextPlayer.color;
        let playerPieces = this.pieces.filter(p => p.color === color);
        playerPieces.forEach(piece => {
            if(number === 1 || number === 6){
                if(piece.position === color.charAt(0) + '1'
                    ||piece.position === color.charAt(0) + '2'
                    ||piece.position === color.charAt(0) + '3'
                    ||piece.position === color.charAt(0) + '4'
                ){
                    let to = {red: '1', blue: '11', green: '21', yellow: '31'}[color];
                    options.push({piece, from: piece.position, to: to})
                }
            }
            let index = PATHS[color].findIndex(p => p === piece.position);
            let to = PATHS[color][index+number];
            let find = playerPieces.find(p => {
                return p.position === to && to.charAt(0) === color.charAt(0)
            });
            if(!isNaN(piece.position) && to && !find){
                options.push({piece, from: piece.position, to: to})
            }
        })
        this.turn = {
            player: nextPlayer,
            number,
            options,
        }
        console.log('NEW TURN: ' + this.turn.player.id + ' ' + this.turn.number);
        console.log('OPTIONS: ' + this.turn.options);
        this.pending = Date.now();
    }

    confirm(playerId, from) {
        if(playerId !== this.turn.player.id) return;
        if(from){
            let option = this.turn.options.find(o => o.from === from);
            if(option){
                this.move(option.from, option.to);
            }
        }
        if(!from && this.turn.options.length > 0){
            let option = this.turn.options[0];
            if(option){
                this.move(option.from, option.to);
            }
        }
        console.log('CONFIRM: ' + this.turn.player.id + ' ' + this.turn.number);
        this.pending = null;
        if(!this.win){
            this.nextMove();
        }
    }

    refresh(){
        let waiting = TURN_TIME - Math.floor((this.pending ? Date.now() - this.pending : 0) / 1000);
        if(waiting < 1){
            this.confirm(this.turn.player.id);
        }
    }

    initPieces(){
        this.pieces = [];
        this.players.forEach(player => {
            this.pieces = [...this.pieces,
                {color: player.color, position: player.color.charAt(0) + '1', original: player.color.charAt(0) + '1'},
                {color: player.color, position: player.color.charAt(0) + '2', original: player.color.charAt(0) + '2'},
                {color: player.color, position: player.color.charAt(0) + '3', original: player.color.charAt(0) + '3'},
                {color: player.color, position: player.color.charAt(0) + '4', original: player.color.charAt(0) + '4'},
            ]
        });

    }


    move(from, to){
        console.log('MOVE: ', from, ' -> ', to);
        let piece = this.pieces.find(p => p.position === from && p.color === this.turn.player.color);
        let others = this.pieces.filter(p => p.position === to && p.color !== this.turn.player.color);
        others.forEach(piece => {
            piece.position = piece.original;
        })
        piece.position = to;
        this.checkWin();
    }


    checkWin(){
        this.players.forEach(player => {
            let playerPieces = this.pieces.filter(p => p.color === player.color);
            let found5 = playerPieces.find(p => {
                return p.position === player.color.charAt(0) + '5'
            });
            let found6 = playerPieces.find(p => {
                return p.position === player.color.charAt(0) + '6'
            });
            let found7 = playerPieces.find(p => {
                return p.position === player.color.charAt(0) + '7'
            });
            let found8 = playerPieces.find(p => {
                return p.position === player.color.charAt(0) + '8'
            });
            if(found5 && found6 && found7 && found8){
                this.win = player;
            }
        })
    }
}


module.exports = Game;
