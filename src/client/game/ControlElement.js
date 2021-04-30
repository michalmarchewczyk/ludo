const COLORS = {
    red: '#f85d5d',
    blue: '#3b87f8',
    green: '#61f361',
    yellow: '#eeee7b',
}
import localization from "./Localization";

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
        this.container.innerHTML = `<h2><span class="localized">ready?</span></h2>`;
        this.container.innerHTML += `<button>${
            game.currentPlayer.ready ? 
                '<span class="localized">ready</span>' :
                '<span class="localized">not-ready</span>'}</button>`;
        this.container.innerHTML += `<br><h2><span class="localized">players</span></h2>`;
        game.players.forEach(player => {
            // console.log(game, player.id);
            this.container.innerHTML += `
                <span
                 class="gameControlPlayer"
                 style="background: ${COLORS[player.color]}; border-width: ${game.turn?.player?.id === player.id ? '4px' : '2px' }"
                >
                    ${player.id === game.currentPlayer.id ? '(<span class="localized">you</span>)' : ''}
                    ${player.name}
                    ${!game.started ? player.ready ? '(<span class="localized">ready</span>)' : '(<span class="localized">not-ready</span>)' : ''}
                    ${game.turn?.player?.id === player.id ? `
                        <span class="gameControlPlayerTime">${game.waiting}</span>
                    ` : ''}
                </span>
            `;
        });
        this.container.children[1].onclick = () => {
            this.setReady(!game.currentPlayer.ready);
            this.container.children[1].innerHTML = (!game.currentPlayer.ready) ? '<span class="localized">ready</span>' : '<span class="localized">not-ready</span>';
            localization.refresh();
        }
        localization.refresh();
    }
}


export default ControlElement;
