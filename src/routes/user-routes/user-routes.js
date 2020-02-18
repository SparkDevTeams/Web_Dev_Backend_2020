import UserController from "../../controllers/user.controller/user.controller";
import AuthController from "../../controllers/user.controller/auth.controller";
export default app =>{
   
   app.post('/sign-up',(req,res)=>{
     console.log(AuthController); 
     AuthController.sign_up(req,res)
   })

   app.post('/log-in',(req,res)=>{
    AuthController.sign_in(req,res)
   });

    app.route("/users")
        .get(UserController.list_all_users)
        .post(UserController.create_a_user);
    app.route("/users/:id")
        .get(UserController.read_a_user)
        .put(UserController.update_a_user)
        .delete(UserController.delete_a_user)
}