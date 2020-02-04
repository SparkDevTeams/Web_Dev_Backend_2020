import user_methods from "../../controllers/user.controller/user.controller";

/**
 * Sorry bro I didn't understand the logic behind the sample.controller.projection
 * so I kinda fell bad just using it, maybe we'll change this later
 */
export default app =>{
   
   app.post('/sign-up',(req,res)=>{
     user_methods.sign_up()
     .then((res)=>{
         res.json({
             message:"account created succesfully"
         })
     }).catch(err=>{res.json({message:"account couldn't be created"})})
   })

   app.post('/log-in',(req,res)=>{
       user_methods.log_in()
       .then((res)=>{
           res.json({//send message if log in was succesful
               message: "logged in succesfully"
           })
       }).catch(err =>{ res.json({message:"log-in error"})})
   })
   
   app.post('/log-out',(req,res)=>{
       user_methods.log_out()
   })




}