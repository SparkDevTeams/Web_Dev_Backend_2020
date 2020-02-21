/**
 * Filters what data is returned from database queries.
 */
export default (user, route) => {
  let projection = {};

  switch (route) {
    case "GET /challengeCategory":
      projection = {
        __v: 0
      };
      break;
    case "GET /challengeCategory/:id":
      projection = {
        __v: 0
      };
      break;
    case "PUT /challengeCategory/:id":
      projection = {
        __v: 0
      };
      break;
  }

  return projection;
};
