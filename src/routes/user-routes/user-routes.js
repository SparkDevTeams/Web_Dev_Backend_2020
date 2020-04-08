import UserController from "../../controllers/user.controller/user.controller";
import AuthController from "../../controllers/user.controller/auth.controller";
import isAuthenticated from "../../services/middleware/auth.middleware";
export default (app) => {
  app.route("/signup").post(AuthController.sign_up);

  app.route("/login").post(AuthController.sign_in);

  app
    .route("/users")
    .get(isAuthenticated(), UserController.list_all_users)
    .post(UserController.create_a_user);
  app
    .route("/users/:id")
    .get(UserController.read_a_user)
    .put(UserController.update_a_user)
    .delete(UserController.delete_a_user);
};
