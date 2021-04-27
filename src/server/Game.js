const uuid = require('uuid');

const TURN_TIME = 20;

class Game {
    constructor() {
        this.id = uuid.v4();
        this.started = false;
        this.players = [];
        this.pieces = [];
        this.turn = null;
        this.pending = null;
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
        this.started = true;
        this.nextMove();
    }

    nextMove(){
        let nextPlayer = this.players[
            ((this.players.findIndex(p => p.id === this.turn?.player?.id) ?? -1) + 1) % this.players.length
            ];
        this.turn = {
            player: nextPlayer,
            number: Math.floor(Math.random() * (7 - 1)) + 1,
        }
        console.log('NEW TURN: ' + this.turn.player.id + ' ' + this.turn.number);
        this.pending = Date.now();
    }

    confirm(playerId) {
        if(playerId !== this.turn.player.id) return;
        console.log('CONFIRM: ' + this.turn.player.id + ' ' + this.turn.number);
        this.pending = null;
        this.nextMove();
    }

    refresh(){
        let waiting = TURN_TIME - Math.floor((this.pending ? Date.now() - this.pending : 0) / 1000);
        if(waiting < 1){
            this.confirm(this.turn.player.id);
        }
    }
}


module.exports = Game;
