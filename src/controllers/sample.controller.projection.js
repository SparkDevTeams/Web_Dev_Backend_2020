/**
 * Filters what data is returned from database queries.
 */
export default (user, route) => {
  let projection = {};

  switch (route) {
    case "GET /samples":
      projection = {
        __v: 0
      };
      break;
    case "GET /samples/:id":
      projection = {
        __v: 0
      };
      break;
    case "PUT /samples/:id":
      projection = {
        __v: 0
      };
      break;
  }

  return projection;
};
