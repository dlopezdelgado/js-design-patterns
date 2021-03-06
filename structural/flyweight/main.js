let Task = function (data) {
  this.flyweight = FlyweightFactory.get(data.project, data.priority, data.user, data.completed);
  this.name = data.name;
  // this.priority = data.priority;
  // this.project = data.project;
  // this.user = data.user;
  // this.completed = data.completed;
}

Task.prototype.getPriority = function () {
  this.flyweight.priority;
}

function Flyweight(project, priority, user, completed) {
  this.priority = priority;
  this.project = project;
  this.user = user;
  this.completed = completed;
}

let FlyweightFactory = function () {   // can be called SubTask or PartialTask

  let flyweights = {};

  let get = function (project, priority, user, completed) {
    if (!flyweights[project + priority + user + completed]) {
      flyweights[project + priority + user + completed] = new Flyweight(project, priority, user, completed);
    }

    return flyweights[project + priority + user + completed];
  };

  let getCount = function () {
    let count = 0;
    for (let f in flyweights) count++;
    return count;
  }

  return {
    get,
    getCount
  }

}();

function TaskCollection() {
  let tasks = {};
  let count = 0;
  let add = function (data) {
    tasks[data.name] = new Task(data);
    count++;
  }
  let get = function (name) {
    return tasks[name];
  }
  let getCount = function () {
    return count;
  }

  return {
    add,
    get,
    getCount
  };
}

let tasks = new TaskCollection();


let projects = ['none', 'courses', 'training', 'project'];
let priorities = [1, 2, 3, 4, 5];
let users = ['Jon', 'Erica', 'Amanda', 'Nathan'];
let completed = [true, false];

let initialMemory = process.memoryUsage().heapUsed; // ???

for (let i = 0; i < 1000000; i++) {
  tasks.add({
    name: 'task' + i,
    priority: priorities[Math.floor((Math.random() * 5))],
    project: projects[Math.floor((Math.random() * 4))],
    user: users[Math.floor((Math.random() * 4))],
    completed: completed[Math.floor((Math.random() * 2))]
  });
}

let afterMemory = process.memoryUsage().heapUsed;
console.log('used memory ' + (afterMemory - initialMemory) / 1000000);

console.log('tasks:' + tasks.getCount());
console.log('flyweights:' + FlyweightFactory.getCount());