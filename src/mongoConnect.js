

const { MongoClient, ServerApiVersion } = require('mongodb');
const user = "iste438g6"
const password = "iste438g6"
const uri = "mongodb+srv://"+user+":"+password+"@iste-438-g6.y1mnu.mongodb.net/ISTE-438-G6?retryWrites=true&w=majority";


var MongoConnect = function () {
    let dbo;


    async function init(){
        const client = new MongoClient(uri);
        try {
            await client.connect();
            //await listDatabases(client);
            dbo = client.db('MLS2021');
        }
        catch(e){
            console.log(e);
        }

        return MongoConnect;
    }


    return {
        init: function() {
            return init()
        },
        getDB: function(){
            return dbo;
        }
    }
}

module.exports = MongoConnect
