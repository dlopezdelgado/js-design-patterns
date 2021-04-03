const Task = require('./task');
const repoFactory = require('./repoFactorywCache');

let task1 = new Task(repoFactory.getRepo('task').get(1));
let task2 = new Task(repoFactory.getRepo('task').get(2));

let user = repoFactory.getRepo('user').get(1);
let project = repoFactory.getRepo('project').get(1);

task1.user = user;
task1.project = project;

task1.save();