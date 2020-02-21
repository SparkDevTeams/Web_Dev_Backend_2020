import RatingController from "../controllers/rating/rating.controller";

export default app => {
  app
    .route("/ratings")
    .get(RatingController.list_all_ratings)
    .post(RatingController.create_a_rating);

  app
    .route("/ratings/:id")
    .get(RatingController.read_a_rating)
    .put(RatingController.update_a_rating)
    .delete(RatingController.delete_a_rating);
};

