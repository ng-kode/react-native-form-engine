import validate from 'validate.js';
import lodash from 'lodash';

validate.validators.sumToHundred = (value, options, key, attributes) => {
  const paths = options.paths.filter(path => path !== key).concat(key);
  const sum = paths.reduce((acc, path) => {
    return (acc += lodash.get(attributes, path) || 0);
  }, 0);

  if (sum !== 100) {
    return `^Should sum up to 100, now ${sum}`;
  }
};

export default {
  email: {email: {message: '^INVALID_EMAIL'}},
  preferredOS: {exclusion: ['windows']},
  confirmPassword: {equality: 'password'},
  investA: {sumToHundred: {paths: ['investA', 'investB', 'investC']}},
  investB: {sumToHundred: {paths: ['investA', 'investB', 'investC']}},
  investC: {sumToHundred: {paths: ['investA', 'investB', 'investC']}},
};
