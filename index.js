import * as db from "./src/services/pizzas-services.js"
import Pizza from "./src/models/pizza.js";

import express from 'express';

const app = express();
const port = 80;

app.use(express.json());

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

var server = app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});