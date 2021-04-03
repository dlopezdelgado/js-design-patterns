let repo = function () {

  let db = {};

  const get = function (id) {
    console.log('Getting user ' + id);
    return {
      name: 'new user from db'
    }
  }

  return {
    get: get
  }

}

module.exports = repo;