
const express = require('express');
const app = express();
const DataLayer = require('./src/dataLayer')
const db = DataLayer();
const port = 8080;

app.use(express.json());

app.get('/search', function(req, res) {
    let terms = req.query.keyword
    console.log(terms);
    db.search(terms).then((results) => {
        res.send(results)
    }).catch((rejection) =>{
        res.status(500).send("Error: Something went wrong: "+rejection)
    })
});

app.listen(port, () => {
    console.log(`listening on localhost:${port}`)
})