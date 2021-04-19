"use strict";
import './styles/main.scss';

import App from "./App";

const container = document.createElement('div');
document.body.appendChild(container);

const app = new App(container);

app.init();
