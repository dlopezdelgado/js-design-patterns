let repo = function () {

  let db = {};

  const get = function (id) {
    console.log('Getting project ' + id);
    return {
      name: 'new project from db'
    }
  }

  return {
    get: get
  }

}

module.exports = repo;