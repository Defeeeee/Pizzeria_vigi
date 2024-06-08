import * as db from "./src/services/pizzas-services.js"
import Pizza from "./src/models/pizza.js";

import express from 'express';

import * as https from "node:https";
import fs from "node:fs";

const options = {
    key: fs.readFileSync('/etc/letsencrypt/live/fdiaznem.me/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/fdiaznem.me/fullchain.pem')
};

const app = express();
const port = 443;

app.use(express.json());

app.get('/phpmyadmin', (req, res) => {
    res.redirect("https://fdiaznem.me:8443/phpmyadmin");
});

app.get('/cockpit', (req, res) => {
    res.redirect("https://fdiaznem.me:9090");
});

app.get('/TICSolver', (req, res) => {
    res.redirect("https://fdiaznem.me:9000/ticsolver");
});

app.get('/pizzas', async (req, res) => {
    const pizzas = await db.getAll();
    res.json(pizzas);
});

app.get('/', (req, res) => {
    res.send("waaaaaaa");
});

app.get('/pizzas/:id', async (req, res) => {
    const id = req.params.id;
    const pizza = await db.getById(id);
    if (pizza) {
        res.json(pizza);
    } else {
        res.status(404).send();
    }
});

app.use(express.static('static'));


var server = https.createServer(options, app).listen(port, () => {
    console.log(`Server running on port ${port}`);
});