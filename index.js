import * as db from "./src/services/pizzas-services.js"
import express from 'express';
import * as https from "node:https";
import options from "./sslConfig.js"

// Express app creation
const app = express();
const port = 443;

app.use(express.json());

// Redirects to another ports/pages
app.get('/phpmyadmin', (req, res) => {
    res.redirect("https://fdiaznem.me:8443/phpmyadmin");
});

app.get('/cockpit', (req, res) => {
    res.redirect("https://fdiaznem.me:9090");
});

app.get('/TICSolver', (req, res) => {
    res.redirect("https://fdiaznem.me:9000/ticsolver");
});

// REST API, DB conn
app.get('/pizzas', async (req, res) => {
    const jose = await db.getAll();
    res.json(jose);
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

app.get('/pizzas/insert/:data', async (req, res) => {
    const data = req.params.data.split(',');
    const pizza = {
        nombre: data[0],
        libreGluten: data[1],
        importe: data[2],
        descripcion: data[3]
    };
    const result = await db.insert(pizza);
    res.json(result);
});

// HTTPS server on port
https.createServer(options, app).listen(port, () => {
    console.log(`Server running on port ${port}`);
});

// app.listen(port, () => {
//     console.log(`Server running on port ${port}`);
// });
