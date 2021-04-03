let Task = require('./task');


// Observers

let notificationService = function () {
  let message = 'Notifying ';
  this.update = function (task) {
    console.log(message + task.user + ' for task ' + task.name);
  }
};

let loggingService = function () {
  let message = 'Logging ';
  this.update = function (task) {
    console.log(message + task.user + ' for task ' + task.name);
  }
};

let auditingService = function () {
  let message = 'Auditing ';
  this.update = function (task) {
    console.log(message + task.user + ' for task ' + task.name);
  }
};

// Observer List

function ObserverList() {
  this.observerList = [];
}

ObserverList.prototype.add = function (obj) {
  return this.observerList.push(obj);
}

ObserverList.prototype.get = function (index) {
  if (index > -1 && index < this.observerList.length) {
    return this.observerList[index];
  }
}

ObserverList.prototype.count = function () {
  return this.observerList.length;
}

ObserverList.prototype.removeAt = function (index) {
  this.observerList.splice(index, 1);
}

ObserverList.prototype.indexOf = function (obj, startIndex) {
  let i = startIndex;

  while (i < this.observerList.length) {
    if (this.observerList[i] === obj) {
      return i;
    }
    i++;
  }

  return -1;
}

// Creating the subject

let ObservableTask = function (data) {
  Task.call(this, data);
  this.observers = new ObserverList();
}

ObservableTask.prototype.addObserver = function (observer) {
  this.observers.add(observer);
}

ObservableTask.prototype.removeObserver = function (observer) {
  this.observers.removeAt(this.observers.indexOf(observer, 0));
}

ObservableTask.prototype.notify = function (context) {
  let observerCount = this.observers.count();
  for (let i = 0; i < observerCount; i++) {
    this.observers.get(i)(context);   // Execute context (callback passed to the function)
  }
}

ObservableTask.prototype.save = function () {

  this.notify(this);
  Task.prototype.save.call(this);

};



// Instance task

let task1 = new ObservableTask({
  name: 'create a demo for observers',
  user: 'Daniel'
});

// Instance observers
let not = new notificationService();
let ls = new loggingService();
let audit = new auditingService();

task1.addObserver(not.update);
task1.addObserver(ls.update);
task1.addObserver(audit.update);


task1.save();

console.log('-----------');
task1.removeObserver(audit.update);


task1.save();