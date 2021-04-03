const repo = function () {
  let called = 0;
  let save = function (task) {
    called++;
    console.log('Saving ' + task + ' Called ' + called + ' times');
  }

  console.log('newing up task repo');
  return {
    save
  }
}

module.exports = repo();  // When I call the function in the export, commonJS caches the entire function, that's a way of singleton it