const express = require("express")
const cors = require("cors")
const jwt = require("jsonwebtoken");
const cookieParser = require('cookie-parser');


require('dotenv').config();
require("./configs/mongoose.config.js")
const app = express()


app.use(cookieParser());
// Change the app.use(cors()) to the one below
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));




app.use(express.json(),
express.urlencoded({ extended: true }));

const Routes = require("./routes/user.routes");
Routes(app);

app.listen(8000, () => console.log("The server is all fired up on port 8000"));