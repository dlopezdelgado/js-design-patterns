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


let myTask = new Task('Legacy Task');
myTask.complete();
myTask.save();


let urgentTask = new Task('Urgent Task');

// Extending (Decorating) urgentTask object
urgentTask.priority = 2;
urgentTask.notify = function (){
  console.log('notifying important people');
};

urgentTask.complete();
// Redefining save method for urgentTask object
urgentTask.save = function (){
  this.notify();
  Task.prototype.save.call(this); // call binds save execution to 'this' scope
};

urgentTask.save();
