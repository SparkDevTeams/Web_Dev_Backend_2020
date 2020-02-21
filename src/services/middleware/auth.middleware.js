import jwt from "jsonwebtoken";
import config from "config";

/**
 * Middleware function for authenticating a user based on their JWT token.
 */
export default options => {
  return (req, res, next) => {
    // implement the middleware function based on the options object
    const token = req.headers["x-access-token"] || req.body.token;
    if (!token)
      return res
        .status(401)
        .send({ auth: false, message: "No token provided." });

    jwt.verify(token, config.get("secret"), (err, decoded) => {
      if (err) {
        console.log(err);
        return res
          .status(500)
          .send({ auth: false, message: "Failed to authenticate token." });
      }

      if (decoded) {
        req.user = decoded;
        next();
      } else {
        return res.status(500).send({ message: "something went wrong" });
      }
    });
  };
};

/**
 * Mongoose middleware for determining what permission is required to
 * have access to this route
 *
 * @param {String} desiredRole
 */
export const roleValidator = desiredRole => {
  return (req, res, next) => {
    // return an error
    if (!desiredRole)
      throw new Error("Failed to define what is the desiredRole of the route");
    // search through roles array of the user that is requesting permission to access this route
    if (req.user.role.includes(desiredRole)) {
      next();
    } else {
      return res.status(403).send({
        permission: false,
        message: "User does not have permission to access route."
      });
    }
  };
};
