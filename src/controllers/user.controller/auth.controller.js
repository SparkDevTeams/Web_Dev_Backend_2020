import  User  from "../../models/user.model";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default {
  sign_in: (req,res) => {
     
     User.find({'email' : req.body.email}, async (err,user)=>{
     
     if(err){
         res.status(404).json({
             'message':err
         })
     }

    
     if(user[0] == undefined){//if the user doesn't exist send an error message
        res.status(400).json({
            message:"user not found in the database"
        })
        return;
    }
  
    try{     

        if(await bcrypt.compare(req.body.password, user[0].password)){
            const logged_in_user = user[0];
            // if the user is authenticated correctly then return the accessToken
            
          const accessToken = jwt.sign(logged_in_user.toJSON(), process.env.ACCESS_TOKEN_SECRET) 
          res.json({
              accessToken: accessToken,
          })

        }
    }catch(err){
      
        res.json({
            message:"passwords don't match",
        })
    }


 })
  
},

  sign_up: (req,res) =>{
    const {name, email, password } = req.body

    if(password.length < 7){//cheking that the password is more than seven characters
        res.json({
            message:"passwod must be more than 7 characters",
        })
        return;//send error message and stop
    }

        const salt = bcrypt.genSaltSync(10)
        const hashPass = bcrypt.hashSync(password,salt)  //encrypting user's password

        const newUser = new User({
           name,
           email,
           password: hashPass,
        })

        newUser.save(err =>{//saving the newly created user to the database
            if(err){
               res.status(500).json({
                   message: "couldn't save the new user information"
               })
               return;
            }else{
                res.json({
                    message:"Signed-up successfully"
                })
                return;
            }
        })
      
  },


  change_password: (req, res) => {

  },
  forget_password: (req, res) => {

  }
}