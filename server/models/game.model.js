const mongoose = require("mongoose")


const GameSchema = new mongoose.Schema({

    name : {
        type: String,
    },
    id : {
        type: String,
    }

    // genres : [
    //     {

    //     }]

});


  
  



const Game = mongoose.model("Game", GameSchema)

module.exports.Game = Game

module.exports.GameSchema = GameSchema;