import ChallengeCategoryController from "../controllers/challenge-category/challenge-category.controller";

export default app => {
  app
    .route("/challenge-categories")
    .get(ChallengeCategoryController.list_all_challenge_categories)
    .post(ChallengeCategoryController.create_a_challenge_category);

  app
    .route("/challenge-categories/:id")
    .get(ChallengeCategoryController.read_a_challenge_category)
    .put(ChallengeCategoryController.update_a_challenge_category)
    .delete(ChallengeCategoryController.delete_a_challenge_category);
};

