/**
 * Filters what data is returned from database queries.
 */
export default (user, route) => {
    let projection = {};
  
    switch (route) {
      case "GET /challenge":
        projection = {
          __v: 0
        };
        break;
      case "GET /challenge/:id":
        projection = {
          __v: 0
        };
        break;
      case "PUT /challenge/:id":
        projection = {
          __v: 0
        };
        break;
    }
  
    return projection;
  };
  