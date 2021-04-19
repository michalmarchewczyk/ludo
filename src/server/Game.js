const uuid = require('uuid');

class Game {
    constructor() {
        this.id = uuid.v4();
        this.started = false;
        this.players = [];
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
        }
        return gameInfo;
    }

    checkReady(){
        if(
            (
                (this.players.length >= 2
                && this.players.filter(p => p.ready).length === this.players.length)
                || this.players.length === 4)
            && !this.started){
            console.log('START');
            this.started = true;
        }
    }
}


module.exports = Game;
