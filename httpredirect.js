import express from 'express';

const domain = 'fdiaznem.me';
const app = express();
// redirect every single incoming request to https
app.use(function(req, res) {
    res.redirect('https://' + domain + req.originalUrl);
});
app.listen(80);