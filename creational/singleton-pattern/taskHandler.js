const myRepo = require('./repo');


const taskHandler = function() {
  return {
    save: function() {
      myRepo.save('Hi from taskHandler');
    }
  }
}


module.exports = taskHandler();