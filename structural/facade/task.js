let Task = function (data) {
  this.name = data.name;
  this.priority = data.priority;
  this.project = data.project;
  this.user = data.user;
  this.completed = data.completed;
}

// This is a module pattern
let TaskService = function () {
  return {
    complete: function (task) {
      task.completed = true;
      console.log('completing task: ' + task.name);
    },
    setCompleteData: function (task) {
      task.completeDate = new Date();
      console.log(task.name + ' completed on ' + task.completeDate);
    },
    notifyCompletion: function (task, user) {
      console.log('Notifying ' + user + ' of the completion of ' + task.name);
    },
    save: function (task) {
      console.log('Saving Task; ' + task.name);
    }
  }
}();

// Starting the Facade pattern

let TaskServiceWrapper = function () {

  let completeAndNotify = function (myTask) {

    TaskService.complete(myTask);
    if (myTask.completed == true) {
      TaskService.setCompleteData(myTask);
      TaskService.notifyCompletion(myTask, myTask.user);
      TaskService.save(myTask);
    }
  }

  return {
    completeAndNotify: completeAndNotify
  }
}();  // This executes the wrapper

let myTask = new Task({
  name: 'MyTask',
  priority: 1,
  project: 'Test Project',
  user: 'Test User',
  completed: false
});

TaskServiceWrapper.completeAndNotify(myTask);



console.log(myTask);
