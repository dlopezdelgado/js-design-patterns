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

// Extending legacy Task
// Create a sub object to wrap Task in its own thing by creating a new constructor

let UrgentTask = function (name, priority) {
  Task.call(this, name);  // Is similar than super
  this.priority = priority;
};

// UrgentTask needs to set its prototype methods with Task prototype
UrgentTask.prototype = Object.create(Task.prototype);
UrgentTask.prototype.notify = function () {
  console.log('notifying important people');
};
// Extending save method for UrgentTask
UrgentTask.prototype.save = function () {
  this.notify();
  console.log('do special stuff before saving');
  Task.prototype.save.call(this); // call binds save execution to 'this' scope
};

let ut = new UrgentTask('This is urgent', 1);
ut.complete();
ut.save();
console.log(ut);