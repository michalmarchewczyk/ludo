const express = require('express');

const router = express.Router();

const Game = require('./Game');
const Player = require('./Player');

let games = [];
let players = [];

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
    players.push(player);

    console.log(games.find(game => game.players.length < 4));
    const game = new Game(); // search instead
    req.session.gameId = game.id;
    game.addPlayer(player);
    games.push(game);
    player.gameId = game.id;

    res.json({playerId: player.id, gameId: game.id})
})

router.get('/clear', (req, res) => {
    games = [];
    players = [];
    res.end('CLEARED GAMES AND PLAYERS');
})

router.get('/debug', (req, res) => {
    res.json({
        games: games,
        players: players,
    });
})

router.post('/load', (req, res) => {
    const {playerId} = req.body;

    const player = players.find(p => p.id === playerId);

    if(player){
        const game = games.find(g => g.id === player.gameId);
        res.json({gameId: game.id, name: player.name});
    }else{
        res.sendStatus(404);
    }


})

module.exports = router;