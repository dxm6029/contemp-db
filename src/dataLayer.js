


var DataLayer = function(){
    const MongoConnect = require('./mongoConnect.js')

    const mongo = new MongoConnect()

    mongo.init()



    async function getItemById(id){
        let result = await mongo.getDB().collection("Matches").findOne({ id: {$eq: Number(id)}});

        if (result) {
            console.log(`Found a match in the collection with id '${id}':`);
            console.log(result);
            return result;
        } else {
            console.log(`No match with the id '${id}'`);
        }

    }


    async function search(keyword) {
        let regex = new RegExp(`\\b${keyword}.`, "i")

        let result = await mongo.getDB().collection("Matches").find({
            $or:
                [
                    {home: regex},
                    {away: regex},
                    {venue: regex},
                    {home_goal_scorers: regex},
                    {away_goal_scorers: regex},


                ]
        }).toArray();
        if (result) {
            console.log(`Found a listing in the collection with keyword '${regex}':`);
            console.log(result);
            return result;
        } else {
            console.log(`No listings found with the name '${regex}'`);
        }
    }

    async function getComments(matchID) {

        const query = {id: {$eq: Number(matchID)}};

        const options = {
            projection: { _id: 0, id: 1, comment: 1 },
          };

        let result = await mongo.getDB().collection("Comments").find(query, options).toArray();
        if (result) {
            console.log(`Found comments for the match with id '${matchID}':`);
            console.log(result);
            return result;
        } else {
            console.log(`No comments found for the match with the id '${matchID}'`);
        }
    }

    async function addComment(matchID, comment) {
        const obj = {id: Number(matchID), comment: comment};

        let result = await mongo.getDB().collection("Comments").insertOne(obj, function(err, res) {
            if (err) throw err;
            console.log("1 document inserted");
        });
        if(result){
            console.log(`Inserted comment \''${comment}'\' for the match with id '${matchID}':`);
        }
    }

    return {
        search: function(keyword) {
            return search(keyword)
        },
        getComments: function(matchID){
            return getComments(matchID)
        },
        addComment: function(matchID, comment){
            return addComment(matchID, comment)
        },
        getItemById: function(id){
            return getItemById(id)
        }
    }
}
module.exports = DataLayer

