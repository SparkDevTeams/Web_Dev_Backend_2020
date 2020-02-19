/**
 * Filters what data is returned from database queries.
 */
export default (user, route) => {
  let projection = {};

  switch (route) {
    case "GET /challenges":
      projection = {
        __v: 0
      };
      break;
    case "GET /challenges/:id":
      projection = {
        __v: 0
      };
      break;
    case "PUT /challenges/:id":
      projection = {
        __v: 0
      };
      break;
  }

  return projection;
};
