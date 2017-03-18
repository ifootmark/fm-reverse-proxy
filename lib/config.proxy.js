'use strict'

var options = {
  prefixPath: '/',
  staticPath: 'static',
  port: 3001,
  target: '/',
  filter: ''
};

var getOptions = function(opt) {
  try {
    Object.keys(options).forEach(function(key) {
      if (opt[key] === undefined || opt[key] === null) {
        opt[key] = options[key];
      }
    })
    return opt;
  } catch (e) {
    return options;
  }
}

module.exports = getOptions;
