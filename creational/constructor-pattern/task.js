let Task = function (name) {
  this.name = name;
  this.completed = false;
}

// this avoids to create copies of the methods for class Task
Task.prototype.complete = function () {
  console.log('Completing task: ' + this.name);
  this.completed = true;
}

Task.prototype.save = function () {
  console.log('Saving task: ' + this.name);
}


module.exports = Task;