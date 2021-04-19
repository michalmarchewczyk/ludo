const uuid = require('uuid');
const state = require('./state');

class Player {
    constructor(name) {
        this.id = uuid.v4();
        this.name = name;
        this.gameId = '';
        this.ready = false;
    }

    get game(){
        return state.games.find(g => g.id === this.gameId);
    }

    setReady(ready){
        this.ready = ready;
        this.game.checkReady();
    }
}


module.exports = Player;
