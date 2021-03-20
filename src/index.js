const express = require('express');
const redis = require('redis');
const session = require('express-session');

const app = express();


let RedisStore = require('connect-redis')(session);
let redisClient = redis.createClient();

let store = new RedisStore({client: redisClient})
app.use(
    session({
        store: store,
        secret: 'secret',
        resave: false,
        saveUninitialized: true,
    })
);




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
    app.use(express.static('static'))
}

const PORT = process.env.PORT ?? 8080;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})