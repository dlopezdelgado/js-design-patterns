const repoFactory = function () {
  this.getRepo = function (repoType) {
    if (repoType === 'task') {
      if (this.taskRepo) {
        console.log('Retrieving from cache');
        return this.taskRepo;
      } else {
        const taskRepo = require('./taskRepository')();
        return taskRepo;
      }
    }
    if (repoType === 'user') {
      const userRepo = require('./userRepository')();
      return userRepo;
    }
    if (repoType === 'project') {
      const projectRepo = require('./projectRepository')();
      return projectRepo;
    }
  }
}

module.exports = new repoFactory;