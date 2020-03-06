require('dotenv').config()

import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";
import config from "config";
import ChallengeCategoryRoutes from "./routes/challenge-category.routes.js";
import RatingRoutes from "./routes/rating.routes";
import UserRoutes from "./routes/user-routes/user-routes";
import AuthRoutes from "./routes/user-routes/auth.-routes";

let app = express();

let port = config.PORT;
mongoose.Promise = global.Promise;

/**
 * Modify config.DBHost to meet your environment
 */
mongoose
  .connect(config.DBHost, {
    connectTimeoutMS: 30000,
    keepAlive: 1,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .catch(() => {
    console.log("Failed to connect to mongodb server");
  });

// Assume that if a qurest contains data it is encoded as JSON
app.use(bodyParser.urlencoded({ extended: true }));


// Decode request data
app.use(bodyParser.json());

ChallengeCategoryRoutes(app);
RatingRoutes(app);

UserRoutes(app);//contains the user logic
AuthRoutes(app);//contains the auth logic

app.listen(port);

console.log(`Server is listening on port ${port}`);

app.get("/", (req,res)=>{res.send("Back-end running");})

export default app;
