import User from "../../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "config";

export default {
  sign_in_old: (req, res) => {
    User.find({ email: req.body.email }, async (err, user) => {
      if (err) {
        res.status(404).json({
          message: err
        });
      }

      if (user[0] == undefined) {
        //if the user doesn't exist send an error message
        res.status(400).json({
          message: "user not found in the database"
        });
        return;
      }

      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(req.body.password, salt); //encrypting user's password

      try {
        if (await bcrypt.compare(req.body.password, hashedPassword)) {
          const logged_in_user = user[0];
          // if the user is authenticated correctly then return the accessToken

          const accessToken = jwt.sign(logged_in_user.toJSON(), process.env.ACCESS_TOKEN_SECRET);
          res.json({
            accessToken: accessToken
          });
        }
      } catch (err) {
        res.json({
          message: "passwords don't match"
        });
      }
    });
  },

  sign_in: (req, res) => {
    User.findOne({ email: req.body.email }, { __v: 0 })
    .lean()
    .exec((err, dbData) => {
      if (err) {
        res.status(502).send({});
      } else if (typeof dbData === "undefined" || dbData === null) {
        res.status(404).send({});
      } else {
        // compare hash with provided password
        bcrypt.compare(req.body.password, dbData.password, (err, match) => {
          if (err) {
            res.status(500).send({}); // TODO: log to some global express log
          }

          if (match) {
            const issuer = "ChallengeAPI";
            const subject = "Authentication";
            const audience = "User";

            // signing options
            const signOptions = {
              issuer,
              subject,
              audience,
              expiresIn: "12h"
            };

            const token = jwt.sign(
              { id: dbData._id, username: dbData.username, role: dbData.role },
              config.get("secret"),
              signOptions
            );

            // remove the password field
            delete dbData.password;

            res
              .status(200)
              .json({ code: 200, data: dbData, message: "", token: token });
          } else {
            // invalid user data for logging in
            res.status(403).json({});
          }
        });
      }
    });
  },
  
  create_admin: (req, res) => {
    const salt = bcrypt.genSaltSync(10);

    const newAdmin = new User({
      name: "Admin Dude",
      email: "hchev001@gmail.com",
      password: bcrypt.hashSync("pass12345", salt),
      role: ["ROLE_USER", "ROLE_ADMIN"]
    });

    newAdmin.save(err => {
      if (err) {
        return res.status(500).json({
          message: "couldn't create the admin account"
        })
      }

      return res.status(201).json({ message: "admin created"})
    })
  },

  sign_up: (req, res) => {
    const { firstname, lastname, email, password } = req.body;

    const name = "" + firstname + lastname;

    if (password.length < 7) {
      //cheking that the password is more than seven characters
      res.json({
        message: "passwod must be more than 7 characters"
      });
      return; //send error message and stop
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(password, salt); //encrypting user's password

    const newUser = new User({
      name,
      email,
      password: hashPass
    });

    newUser.save(err => {
      //saving the newly created user to the database
      if (err) {
        res.status(500).json({
          message: "couldn't save the new user information"
        });
        return;
      } else {
        res.json({
          message: "Signed-up successfully"
        });
        return;
      }
    });
  },

  change_password: (req, res) => {},
  forget_password: (req, res) => {}
};
