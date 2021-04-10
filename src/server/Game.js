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
}


module.exports = Game;