import { User } from "../../models/user.model";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";

export default {

  sign_up: (req,res) =>{
    const name = req.body.name
    const email= req.body.email
    const password = req.body.password
    const password2 = req.body.passwordCheck

    if(password.length < 7){//cheking that the password is more than seven characters
        res.json({
            message:"passwod must be more than 7 characters",
        })
        return;//send error message and stop
    }
    if(password == password2){ //checking if passwords are equal  
        const salt = bcrypt.genSaltSync(10)
        const hashPass = bcrypt.hashSync(password,salt)  //encrypting user's password

        const newUser = new User({
           name: name,
           email:email,
           password: hashPass,
        })

        newUser.save(err =>{//saving the newly created user to the database
            if(err){
               res.jason({
                   message: "couldn't save the new user information"
               })
               return;
            }
        })
    }else{
      res.json({
          message:"passwords don't match",
      })
      return;//send error message and stop
    }
  },  
  
  
  log_in: async (req,res) => {
     
    const user = User.find(user=> user.email = req.body.name)

    if(user == null){//if the user doesn't exist send an error message
        res.json({
            message:"user not found in the database"
        })
        return;
    }

    try{
        if(await bcrypt.compare(req.body.password, user.password)){// if the user is authenticated correctly then return the accessToken
          const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET) 
          res.json({
              accessToken: accessToken,
          })
        }
    }catch(err){
        res.json({
            message:"passwords don't match",
        })
    }
    
  },

  
  log_out: (req,res) =>{

  }





}