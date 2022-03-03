


var DataLayer = function(){
    const MongoConnect = require('./mongoConnect.js')

    const mongo = new MongoConnect()

    mongo.init()


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

    return {
        search: function(keyword) {
            return search(keyword)
        }
    }
}
module.exports = DataLayer

