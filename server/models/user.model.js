const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const {GameSchema} = require('./game.model')

const UserSchema = new mongoose.Schema({

    firstName : {
        type: String, 
        required : [true, "First Name is Required"]
    },
    lastName : {
        type: String, 
        required : [true, "Last Name is Required"]
    },
    email : {
        type : String, 
        required : [true, "Email is Required"]
    },
    password : {
        type : String, 
        required : [true, "Password is Required"]
    },
    favoritedGames : [GameSchema]
    
    }, {timestamps:true})

    // add this after UserSchema is defined
UserSchema.virtual('confirmPassword')
.get( () => this._confirmPassword )
.set( value => this._confirmPassword = value );

UserSchema.pre('validate', function(next) {
    if (this.password !== this.confirmPassword) {
      this.invalidate('confirmPassword', 'Password must match confirm password');
    }
    next();
  });

  // near the top is a good place to group our imports

// this should go after 
UserSchema.pre('save', function(next) {
  bcrypt.hash(this.password, 10)
    .then(hash => {
      this.password = hash;
      next();
    });
});


  
  



const User = mongoose.model("User", UserSchema)

module.exports = User;