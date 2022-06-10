const { response } = require("express")
const User = require("./../models/user.model.js")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");
const { trusted } = require("mongoose");

// const payload = {
    //     id: user._id
    //   };

const secretKey = process.env.SECRET_KEY;
    
    // notice that we're using the SECRET_KEY from our .env file
module.exports.register = (req, res)=> {
    User.create(req.body)
    .then(user => {
        // const userToken = jwt.sign({
        //     id: user._id
        // }, secretKey);
 
        res
            // .cookie("usertoken", userToken, secretKey, {
            //     httpOnly: true
            // })
            .json({ msg: "success!", user: user });
    })
    .catch(err => res.json(err));
}

  
  
module.exports.login = async(req, res) => {
    const user = await User.findOne({ email: req.body.email });

 
    if(user === null) {
        // email not found in users collection
        return res.sendStatus(400);
    }
 
    // if we made it this far, we found a user with this email address
    // let's compare the supplied password to the hashed password in the database
    const correctPassword = await bcrypt.compare(req.body.password, user.password);
 
    if(!correctPassword) {
        // password wasn't a match!
        return res.sendStatus(400);
    }
 
    // if we made it this far, the password was correct
    // const userToken = jwt.sign({
    //     id: user._id
    // }, secretKey);
 
    // note that the response object allows chained calls to cookie and json
    res
        // .cookie("usertoken", userToken, secretKey, {
        //     httpOnly: true, 
        //     secure : true
        // })
        .json({ msg: "success!", user:user });
}

module.exports.logout = (req, res) => {
    res.clearCookie('usertoken');
    res.sendStatus(200);
}

module.exports.allUsers = (req, res) => {
    User.find()
    .then(user => res.json(user))
    .catch(err => res.status(400).json(err))

}
module.exports.oneUser = (req, res) => {
    User.findOne({_id : req.params.id})
    .then(user => res.json(user))
    .catch(err => res.status(400).json(err))

}

module.exports.getFavorites = (req, res) =>{
    User.findOne({_id : req.params.id})
    .then(user => user.favoritedGames.find()
    .then(favs => res.json(favs))
    .catch(err => res.json(err))
    )
    .catch(err => res.json(err))
}

module.exports.addFavoriteGame = (req, res) => {



    User.findByIdAndUpdate({_id : req.params.id}, {
        $push: {favoritedGames: req.body}
    })
    .then(response => { 
        res.json(response)
        
    })
    .catch(err => {
        res.json(err);

        
    })


}

// module.exports.addGame = (req, res) => {
//     User.findOne(
//         {_id: req.params.id}
        
//     )
//     .then(user.genreScore.push() => res.json(response))
//     .catch(response.status(400).json(err))
// }
