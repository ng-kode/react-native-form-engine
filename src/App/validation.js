import validate from 'validate.js';
import lodash from 'lodash';

validate.validators.sumToHundred = (value, options, key, formValue) => {
  const paths = options.composition.filter(path => path !== key).concat(key);
  const sum = paths.reduce((acc, path) => {
    return (acc += lodash.get(formValue, path) || 0);
  }, 0);

  if (sum !== 100) {
    return `^Should sum up to 100, now ${sum}`;
  }
};

export default {
  myEmail: {
    email: {message: '^INVALID_EMAIL'},
  },
  preferredOS: {
    exclusion: ['windows'],
  },
  confirmPassword: {
    equality: 'password',
  },
  investA: {
    sumToHundred: {
      composition: ['investA', 'investB', 'investC'],
    },
  },
  investB: {
    sumToHundred: {
      composition: ['investA', 'investB', 'investC'],
    },
  },
  investC: {
    sumToHundred: {
      composition: ['investA', 'investB', 'investC'],
    },
  },
};
