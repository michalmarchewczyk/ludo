class Game {
    constructor({name ,playerId }) {
        if(name){
            this.name = name;
            this.connect();
        }else if(playerId){
            this.playerId = playerId;
            this.load();
        }
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
            })
            .catch(e => {
                console.log(e);
            })
    }
}


export default Game;