import projection from "./sample.controller.projection";
import { Sample } from "../models/sample.model";

export default {
  /**
   * GET/
   */
  list_all_samples: (req, res) => {
    // Process request //

    // Query database
    Sample.find({}, projection(req.user, "GET /samples"), (err, dbData) => {
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
  read_a_sample: (req, res) => {
    // Process request //

    // Query database
    Sample.findById(req.params.id, projection(req.user, "GET /samples/:id"), (err, dbData) => {
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
  create_a_sample: (req, res) => {
    // Process request //

    // Cast incoming data as a Sample.
    let sample = new Sample(req.body);

    // Ignore values submitted by user for system controlled fields.
    sample.createdAt = Date.now();
    sample.updatedAt = Date.now();
    sample.published = true;

    // Query database
    sample.save((err, dbData) => {
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
  update_a_sample: (req, res) => {
    // Process request //

    let documentToUpdate = undefined;
    let systemFields = ["_id", "id", "createdAt", "updatedAt", "published"];

    // Query database
    Sample.findById(req.params.id, projection({ route: "PUT /samples/:id" }), (err, dbData) => {
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
    documentToUpdate = new Sample(documentToUpdate);

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
  delete_a_sample: (req, res) => {
    // Process request //

    // Query database
    Sample.remove({ _id: req.params.id }, (err, dbData) => {
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
