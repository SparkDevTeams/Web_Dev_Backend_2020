import projection from "./challenge-category.projection";
import ChallengeCategory from "../../models/challenge-category.model";
export default {
  /**
   * GET/
   */
  list_all_challenge_categories: (req, res) => {
    // Process request //

    // Query database
    ChallengeCategory.find({}, projection(req.user, "GET /ChallengeCategories"), (err, dbData) => {
      // If error occured, return error response
      if (err) {
        res.status(502).send({});
      } else {
        // Return success response
        res.status(200).json({
          code: 200,
          data: dbData,
          message: ""
        });
      }
    });
  },

  /**
   * GET/:id
   */
  read_a_challenge_category: (req, res) => {
    // Process request //

    // Query database
    ChallengeCategory.findById(req.params.id, projection(req.user, "GET /challengeCategory/:id"), (err, dbData) => {
      // If error occured, return error response
      if (err) {
        res.status(502).send({});
      } else if (dbData == null) {
        res.status(404).send({});
      } else {
        // Return success response
        res.status(200).json({
          code: 200,
          data: dbData,
          message: ""
        });
      }
    });
  },

  /**
   * POST/
   */
  create_a_challenge_category: (req, res) => {
    // Process request //

    // Cast incoming data as a Sample.
    let challengeCategory = new ChallengeCategory(req.body);

    // Ignore values submitted by user for system controlled fields.
    challengeCategory.createdAt = Date.now();
    challengeCategory.updatedAt = Date.now();

    // Query database
    challengeCategory.save((err, dbData) => {
      // If error occured, return error respons
      if (err) {
        if (err.name != "ValidationError") {
          res.status(502).send({});
        } else {
          res.status(400).send({});
        }
      }

      // Return success response
      res.status(201).json({
        code: 201,
        data: dbData,
        message: ""
      });
    });
  },

  /**
   * PUT/:id
   */
  update_a_challenge_category: (req, res) => {
    // Process request //

    let documentToUpdate = undefined;
    let systemFields = ["_id", "id", "createdAt", "updatedAt", "published"];

    // Query database
    ChallengeCategory.findById(req.params.id, projection({ route: "PUT /challengeCategory/:id" }), (err, dbData) => {
      // If error occured, return error response
      if (err) {
        res.status(502).send({});
      } else if (dbData == null) {
        res.status(404).send({});
      } else {
        documentToUpdate = dbData;
      }
    });

    // Cast documentToUpdate as a Sample (to facilitate unit testing)
    documentToUpdate = new ChallengeCategory(documentToUpdate);

    // Update the retrieved document with the data submitted
    // to the PUT request (ignoring system controlled fields).
    for (let key in req.body) {
      documentToUpdate[key] = systemFields.indexOf(key) == -1 ? req.body[key] : documentToUpdate[key];
    }

    // Update updatedAt date
    documentToUpdate.updatedAt = Date.now();

    // Query database
    documentToUpdate.save((err, dbData) => {
      // If error occured, return error response
      if (err) {
        if (err.name != "ValidationError") {
          res.status(502).send({});
        } else {
          res.status(400).send({});
        }
      }

      // Return success response
      res.status(200).json({
        code: 200,
        data: dbData,
        message: ""
      });
    });
  },

  /**
   * DELETE/:id
   */
  delete_a_challenge_category: (req, res) => {
    // Process request //

    // Query database
    ChallengeCategory.remove({ _id: req.params.id }, (err, dbData) => {
      // If error occured, return error response
      if (err) {
        res.status(502).send({});
      } else if (dbData == null) {
        res.status(404).send({});
      }

      // Return success response
      res.status(204).json({});
    });
  }
};
