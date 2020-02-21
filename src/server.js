import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";
import config from "config";
import ChallengeCategoryRoutes from "./routes/challenge-category.routes.js";
import RatingRoutes from "./routes/rating.routes";

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

app.listen(port);

console.log(`Server is listening on port ${port}`);

export default app;
