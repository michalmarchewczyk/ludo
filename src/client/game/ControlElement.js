const COLORS = {
    red: '#f85d5d',
    blue: '#3b87f8',
    green: '#61f361',
    yellow: '#eeee7b',
}

class ControlElement {
    constructor(setReady) {
        this.container = document.createElement('div');
        this.container.classList.add('gameControl');
        this.setReady = setReady;
    }

    render(){
        return this.container
    }

    update(game){
        this.container.innerHTML = `<h2>Ready?: </h2>`;
        this.container.innerHTML += `<button>${game.currentPlayer.ready ? 'ready' : 'not ready'}</button>`;
        this.container.innerHTML += `<br><h2>Players: </h2>`;
        game.players.forEach(player => {
            console.log(game, player.id);
            this.container.innerHTML += `
                <span
                 class="gameControlPlayer"
                 style="background: ${COLORS[player.color]}; border-width: ${game.turn?.player?.id === player.id ? '4px' : '2px' }"
                >
                    ${player.id === game.currentPlayer.id ? '(you)' : ''} ${player.name} (${player.ready ? 'ready' : 'not ready'}) 
                </span>
            `;
        });
        this.container.children[1].onclick = () => {
            this.setReady(!game.currentPlayer.ready);
            this.container.children[1].innerText = (!game.currentPlayer.ready) ? 'ready' : 'not ready';
        }
    }
}


export default ControlElement;
