const path = require('path')
const express = require('express')
const lancer = require('./back/lancer.js');
const app = express()

const hostname = '127.0.0.1';
const port = 3000;

app.use(function (req, res, next) {
    date = new Date(Date.now())
    console.log('Time:', date.toLocaleDateString(), date.toLocaleTimeString(), "; url :", req.url);
    next(); // sans cette ligne on ne pourra pas poursuivre.
})

app.use("/static", express.static(path.join(__dirname, '/static')))

app.get('/', (req, res) => {
    res.redirect(301, '/static/index.html')
})

//RECUPERER LES RESULTATS DES DICES
app.get(encodeURI('/remainingDices'), (req, res) => {
    console.log(req.query)
    remainingDices = req.query["valeur"]
    res_dices = lancer.res_dices(remainingDices)
    res.json({
        res_dices: res_dices,
    })
})

//GELER LES DES
app.get(encodeURI('/choose1'), (req, res) => {
    console.log(req.query)
    n = req.query["valeur"]
    freeze = lancer.freeze(n)
    score_de = lancer.majresultat(n)
    console.log(freeze)
    console.log(score_de)
    res.json({
        freeze : freeze, //si freeze = True c'est qu'on peut freeze le dé
        score_de : score_de,
    })
})


app.use(function (req, res) {
    console.log("et c'est le 404 : " + req.url);

    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/html');

    res.end("");

})


app.listen(port, hostname);
console.log(`Server running at http://${hostname}:${port}/`);