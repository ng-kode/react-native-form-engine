import validate from 'validate.js';
import produce from 'immer';
import lodash from 'lodash';

export const getVisibleFields = (fields, state) =>
  fields.filter(
    ({showOnlyWhen}) => validate(state, showOnlyWhen) === undefined,
  );

export const evaluateCustomize = (customize, state) => {
  return Object.keys(customize).reduce((acc, attr) => {
    const rawValue = customize[attr];
    if (rawValue.validation !== undefined) {
      const evaluatedValue = validate(state, rawValue.validation) === undefined;
      return {...acc, [attr]: evaluatedValue};
    } else {
      return {...acc, [attr]: rawValue};
    }
  }, {});
};

export const patchValue = (path, value, state) =>
  produce(state, draftState => {
    lodash.set(draftState, path, value);
  });
