import * as db from "./src/services/pizzas-services.js"
import Pizza from "./src/models/pizza.js";

import express from 'express';

import fs from 'fs';
import https from 'https';

const app = express();
const port = 443;

app.use(express.json());
var options = {
    key: fs.readFileSync('/etc/letsencrypt/live/germand.tplinkdns.com/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/germand.tplinkdns.com/fullchain.pem')
}

app.get('/pizzas', async (req, res) => {
    const pizzas = await db.getAll();
    res.json(pizzas);
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

var server = https.createServer(options, app).listen(port, () => {
    console.log(`Server running on port ${port}`);
})