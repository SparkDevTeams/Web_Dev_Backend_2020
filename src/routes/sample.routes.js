import sampleController from "../controllers/sample.controller";

export default app => {
  app
    .route("/samples")
    .get(sampleController.list_all_samples)
    .post(sampleController.create_a_sample);

  app
    .route("/samples/:id")
    .get(sampleController.read_a_sample)
    .put(sampleController.update_a_sample)
    .delete(sampleController.delete_a_sample);
};
