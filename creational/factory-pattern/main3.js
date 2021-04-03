const Task = require('./task');
const repoFactory = require('./repoFactory2');

let task1 = new Task(repoFactory.task.get(1));
let task2 = new Task(repoFactory.task.get(2));

let user = repoFactory.user.get(1);
let project = repoFactory.user.get(1);

task1.user = user;
task1.project = project;

task1.save();