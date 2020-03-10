import ChallengeController from "../controllers/challenge/challenge.controller";

export default app => {
    app
        .route("/challenges")
        .get(ChallengeController.list_all_challenges)
        .post(ChallengeController.create_a_challenge);
    app
        .route("/challenges/:id")
        .get(ChallengeController.read_a_challenge)
        .put(ChallengeController.update_a_challenge)
        .delete(ChallengeController.delete_a_challenge);
}