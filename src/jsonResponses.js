const users = {};

const respondJSON = (request, response, status, object) => {
  // set status code and content type (application/json)
  response.writeHead(status, { 'Content-Type': 'application/json' });

  response.write(JSON.stringify(object));

  response.end();
};

const respondJSONMeta = (request, response, status) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  response.writeHead(status, headers);
  response.end();
};

const getUsers = (request, response) => {
  // json object to send
  const responseJSON = {
    users,
    message: 'Success!'
  };

  // return 200 with message
  return respondJSON(request, response, 200, responseJSON);
};

const getUsersMeta = (request, response) => {
  // return 200 without message, just the meta data
  respondJSONMeta(request, response, 200);
};

// function just to update our object
const addUser = (request, response, body) => {
  // change to make to user
  const responseJSON = {
    message: 'Name and age are both required.',
  };

  
  if (!body.name || !body.age) {
    responseJSON.id = 'missingParams';
    return respondJSON(request, response, 400, responseJSON);
  }

  //default status code to 204 updated
  let responseCode = 204;

  //If the user doesn't exist yet
  if(!users[body.name]) {
    
    //Set the status code to 201 (created) and create an empty user
    responseCode = 201;
    users[body.name] = {};
  }

  //add or update fields for this user name
  users[body.name].name = body.name;
  users[body.name].age = body.age;

  if (responseCode === 201) {
    responseJSON.message = 'Created Successfully';
    return respondJSON(request, response, responseCode, responseJSON);
  }
  return respondJSONMeta(request, response, responseCode);
};

// function to show not found error
const notFound = (request, response) => {
  // error message with a description
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    
  };

  // return our json with a 404 not found error code
  respondJSON(request, response, 404, responseJSON);
};// end not found

// function for 404 not found without message
const notFoundMeta = (request, response) => {
  // return a 404 without an error message
  respondJSONMeta(request, response, 404);
};// not found meta

module.exports = {
  getUsers,
  getUsersMeta,
  addUser,
  notFoundMeta,
  notFound,
};
