/* 
  Command Pattern: Encapsulates the calling of a method as an object
  - Fully decouples the execution from the implementation
  - Allows for less fragile implementations
  - Support undo operations
  - Supports auditing and logging of operations
  - Generic interface to execute commands as needed
*/

let repo = {

  tasks: {},
  commands: [],

  get: function (id) {
    console.log('Getting task ' + id);
    return {
      name: 'new task from db'
    }
  },

  save: function (task) {
    repo.tasks[task.id] = task;
    console.log('Saving ' + task.name + 'to the db');
  },


  replay: function () {
    for(let i = 0; i < repo.commands.length; i++) {
      let command = repo.commands[i];
      repo.executeNoLog(command.name, command.obj);
    }
  }

}


repo.executeNoLog = function (name) {
  let args = Array.prototype.slice.call(arguments, 1);
  if(repo[name]){
    return repo[name].apply(repo, args);
  }
}

repo.execute = function (name) {
  let args = Array.prototype.slice.call(arguments, 1);

  repo.commands.push({
    name: name,
    obj: args[0]    // Task object
  });

  if (repo[name]) {
    return repo[name].apply(repo, args);
  }

  return false;
};

repo.execute('save', {
  id: 1,
  name: 'Task 1',
  completed: false
});
repo.execute('save', {
  id: 2,
  name: 'Task 2',
  completed: false
});
repo.execute('save', {
  id: 3,
  name: 'Task 3',
  completed: false
});
repo.execute('save', {
  id: 4,
  name: 'Task 4',
  completed: false
});

console.log(repo.tasks);
repo.tasks = {};
console.log(repo.tasks);

repo.replay();
console.log(repo.tasks);