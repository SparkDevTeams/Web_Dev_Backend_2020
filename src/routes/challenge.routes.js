import challengeController from "../controllers/Challenge/challenge.controller";

export default app => {
  app
    .route("/challenges")
    .get(challengeController.list_all_challenges)
    .post(challengeController.create_a_challenge);

  app
    .route("/challenges/:id")
    .get(challengeController.read_a_challenge)
    .put(challengeController.update_a_challenge)
    .delete(challengeController.delete_a_challenge);
};
