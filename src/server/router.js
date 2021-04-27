const express = require('express');
const state = require('./state');
const router = express.Router();

const Game = require('./Game');
const Player = require('./Player');



router.get('/connect', (req, res) => {
    if(req.session.playerId && req.session.gameId){
        res.json({
            msg: 'inGame',
            playerId: req.session.playerId,
            gameId: req.session.gameId,
        })
    }else{
        req.session.destroy();
        res.json({
            msg: 'new',
        })
    }

})

router.post('/connect', (req, res) => {
    console.log(req.body);
    const {name} = req.body;

    const player = new Player(name);
    req.session.playerId = player.id;
    state.players.push(player);

    let game = state.games.find(game => game.players.length < 4 && !game.started)
    if(!game){
        game = new Game();
        state.games.push(game);
    }
    req.session.gameId = game.id;
    game.addPlayer(player);
    player.gameId = game.id;
    player.color = ['red', 'blue', 'green', 'yellow'][game.players.length-1];
    game.checkReady();
    res.json({playerId: player.id, gameId: game.id})
})

router.get('/clear', (req, res) => {
    state.games = [];
    state.players = [];
    res.end('CLEARED GAMES AND PLAYERS');
})

router.get('/debug', (req, res) => {
    res.json({
        games: state.games,
        players: state.players,
    });
})

router.post('/load', (req, res) => {
    const {playerId} = req.body;

    const player = state.players.find(p => p.id === playerId);

    if(player){
        const game = state.games.find(g => g.id === player.gameId);
        res.json({gameId: game.id, name: player.name});
    }else{
        res.sendStatus(404);
    }
})


router.get('/get', (req, res) => {
    const gameId = req.session.gameId;
    const playerId = req.session.playerId;
    const game = state.games.find(game => game.id === gameId);
    if(!game){
        res.sendStatus(404);
        return;
    }
    res.json(game.get(playerId));
})

router.post('/ready', (req, res) => {
    const {ready} = req.body;
    const playerId = req.session.playerId;
    const player = state.players.find(p => p.id === playerId);
    if(!player){
        res.sendStatus(404);
        return;
    }
    player.setReady(!!ready);
    res.json(player);
})


router.post('/confirm', (req, res) => {
    const gameId = req.session.gameId;
    const playerId = req.session.playerId;
    const game = state.games.find(game => game.id === gameId);
    const player = state.players.find(p => p.id === playerId);

    if(!game){
        res.sendStatus(404);
        return;
    }
    game.confirm();
    res.json(game.get(playerId));
})

module.exports = router;
