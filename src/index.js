const express = require('express');
const redis = require('redis');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

const router = require('./server/router');


let RedisStore = require('connect-redis')(session);
let redisClient = redis.createClient(process.env.REDIS_URL);

let store = new RedisStore({client: redisClient})
app.use(
    session({
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 365,
        },
        store: store,
        secret: 'secret',
        resave: false,
        saveUninitialized: true,
    })
);

app.use(bodyParser.json())


app.use((req, res, next) => {
    console.log(`==== REQUEST: ${req.url} ====`)
    console.log(req.session.id)
    console.log(req.session);
    console.log(`//// REQUEST: ${req.url} ////`)
    // store.all((error, sessions) => {
    //     console.log(sessions);
    // })
    next();
});

app.get('/clear', (req, res) => {
    store.clear();
    res.end('CLEARED SESSIONS');
    console.log('CLEARED SESSIONS');
})

app.get('/sessions', (req, res) => {
    store.all((error, sessions) => {
        res.json({error, sessions});
    })
})

app.get('/redis', (req, res) => {
    redisClient.keys('*', (error, keys) => {
        let values = [];
        let done = 0;
        for(let i = 0; i < keys.length; i++){
            let key = keys[i];
            redisClient.get(key, (err, value) => {
                values.push({key, value: JSON.parse(value)});
                done += 1;
                console.log(value);
                if(done === keys.length){
                    res.json({values, info: redisClient.server_info});
                }
            })
        }
    })
})

app.use('/api', router);


const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development';

if(mode === 'development') {
    const webpack = require('webpack');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');
    const config = require('../webpack.dev.js');
    const compiler = webpack(config);

    app.use(
        webpackDevMiddleware(compiler, {
            publicPath: config.output.publicPath,
        })
    );
    app.use(webpackHotMiddleware(compiler));
}else{
    app.use(express.static(path.join(__dirname, 'static')))
}

const PORT = process.env.PORT ?? 8080;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})
