
const express = require('express');
const app = express();
const DataLayer = require('./src/dataLayer')
const db = DataLayer();
const port = 8080;

app.use(express.json());

const path = require('path')
app.use(express.static(__dirname));

app.get('/search', function(req, res) {
    let terms = req.query.keyword
    console.log(terms);
    db.search(terms).then((results) => {
        res.header('Access-Control-Allow-Origin', "*");
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        res.send(results)
    }).catch((rejection) =>{
        res.status(500).send("Error: Something went wrong: "+rejection)
    })
});

app.get('/comments', function(req, res) {
    let id = req.query.id
    console.log(id);
    db.getComments(id).then((results) => {
        res.header('Access-Control-Allow-Origin', "*");
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        res.send(results)
    }).catch((rejection) =>{
        res.status(500).send("Error: Something went wrong: "+rejection)
    })
});


app.get("/match", async function (req,res){
    let id = req.query.id;
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    try {
        let result = await db.getItemById(id);
        res.send(result)
    }
    catch(err){
        res.send(err);
    }


});

app.post('/comments', function(req, res) {
    let id = req.query.id
    let comment = req.query.comment
    console.log(id);
    console.log(comment)
    db.addComment(id, comment).then((results) => {
        res.header('Access-Control-Allow-Origin', "*");
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        res.send(results)
    }).catch((rejection) =>{
        res.status(500).send("Error: Something went wrong: "+rejection)
    })
});

app.get('/image', function(req, res){
    let stadium = req.query.stadium
    console.log("stadium: " + stadium);
    db.getImage(stadium).then((results) => {
        res.header('Access-Control-Allow-Origin', "*");
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        res.send(results)
    }).catch((rejection) =>{
        res.status(500).send("Error: Something went wrong: "+rejection)
    })
});

app.listen(port, () => {
    console.log(`listening on localhost:${port}`)
})