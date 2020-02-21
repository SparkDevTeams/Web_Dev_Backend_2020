import AuthController from "../../controllers/user.controller/auth.controller";

export default app => {

  app.route("user/sign_in")
    .post(AuthController.sign_in)
  
  app.route("/user/sign_up")
    .post(AuthController.sign_up);
  
  app.route("/user/change_password")
    .post(AuthController.change_password);
  app.route("/user/_forget_password")
    .post(AuthController.forget_password)
}