const UserController = require("./../controllers/user.controller")
const { authenticate } = require('../configs/jwt.config');

module.exports = (app) =>{
    app.get("/users/",  UserController.allUsers)
    app.get("/users/:id",  UserController.oneUser)
    app.post("/users", UserController.register)
    app.post("/users/login",  UserController.login)
    app.post("/users/logout", UserController.logout)
    app.patch("/users/:id/favorites", UserController.addFavoriteGame)
    app.get("/users/:id/favorites", UserController.getFavorites)

    
}