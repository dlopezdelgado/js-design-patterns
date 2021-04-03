let Task = require('./task');


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


// Creating the mediator 

let mediator = (function () {
  let channels = {};

  let subscribe = function (channel, context, func) {
    if (!mediator.channels[channel]) {
      mediator.channels[channel] = [];
    }

    mediator.channels[channel].push({
      context,
      func
    });

  };

  let publish = function (channel) {
    if (!this.channels[channel]) {
      return false;
    }

    let args = Array.prototype.slice.call(arguments, 1);  // get an array of arguments (arguments is an array-like object) | [].slice.call(arguments, 1) is an alternative
    
    for (let i = 0; i < mediator.channels[channel].length; i++) {
      let sub = mediator.channels[channel][i];
      sub.func.apply(sub.context, args);
    }

  };

  return {
    channels: {},
    subscribe,
    publish
  };

}());

let task1 = new Task({
  name: 'create a demo for mediators',
  user: 'Jon'
});

let not = new notificationService();
let ls = new loggingService();
let audit = new auditingService();


// subscribe each service to the mediator
mediator.subscribe('complete', not, not.update);
mediator.subscribe('complete', ls, ls.update);
mediator.subscribe('complete', audit, audit.update);

task1.complete = function(){
  mediator.publish('complete', this); // Notifies to all subscribers and then completes the task
  Task.prototype.complete.call(this);
}


task1.complete(); 