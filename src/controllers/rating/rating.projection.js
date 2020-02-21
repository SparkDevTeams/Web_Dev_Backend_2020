/**
 * Filters what data is returned from database queries.
 */
export default (user, route) => {
  let projection = {};

  switch (route) {
    case "GET /rating":
      projection = {
        __v: 0
      };
      break;
    case "GET /rating/:id":
      projection = {
        __v: 0
      };
      break;
    case "PUT /rating/:id":
      projection = {
        __v: 0
      };
      break;
  }

  return projection;
};
