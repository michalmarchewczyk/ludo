const uuid = require('uuid');

class Player {
    constructor(name) {
        this.id = uuid.v4();
        this.name = name;
        this.gameId = '';
    }

}


module.exports = Player;