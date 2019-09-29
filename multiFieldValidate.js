const validate = require('validate.js');
const lodash = require('lodash');

validate.validators.totalHundred = (value, options, key, attributes) => {
  const paths = options.paths.filter(path => path !== key).concat(key);
  const sum = paths.reduce((acc, path) => {
    return (acc += lodash.get(attributes, path) || 0);
  }, 0);

  if (sum > 100) {
    return '^Over 100';
  }
};

const result = validate(
  {foo: 30, bar: 40, baz: 50},
  {
    foo: {
      totalHundred: {
        paths: ['foo', 'bar', 'baz'],
      },
    },
    bar: {
      totalHundred: {
        paths: ['foo', 'bar', 'baz'],
      },
    },
    baz: {
      numericality: {lessThan: 50},
      totalHundred: {
        paths: ['foo', 'bar', 'baz'],
      },
    },
  },
);

console.log(result);
