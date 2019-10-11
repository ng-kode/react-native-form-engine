import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import lodash from 'lodash';
import defaultTemplates from './templates';
import Field from './field';
import validate from 'validate.js';

validate.validators.spendAtLeastOne = (fieldValue, options, key, formValue) => {
  const {composition} = options;
  const values = composition.map(path => lodash.get(formValue, path) || 0);
  return values.reduce((acc, val) => acc + val, 0) > 0
    ? undefined
    : '^Spend time in at least one of them';
};

class FormEngine extends React.Component {
  render() {
    const {formValue, fields, verticalSpacing} = this.props;
    const visibleFields = getVisibleFields(fields, formValue);

    return (
      <>
        {visibleFields.map((field, idx) => {
          const addSpacing = idx !== visibleFields.length - 1;
          return (
            <View
              key={field.path}
              style={addSpacing && {marginBottom: verticalSpacing}}>
              {this.renderField(field)}
            </View>
          );
        })}
      </>
    );
  }

  renderField = field => {
    const {template, path, customize = {}, validation = {}} = field;
    const {formValue, templates} = this.props;
    const Component = templates[template];
    const fieldValue = lodash.get(formValue, path);

    return (
      <Field
        fromEngine={{
          value: fieldValue,
          onChange: value => this.handleChange(path, value),
          errorText: markErrorText(path, formValue, validation),
        }}
        customize={customize}
        Component={Component}
      />
    );
  };

  handleChange = (path, value) => {
    const {formValue, onChange, fields} = this.props;

    let nextState = lodash.cloneDeep(formValue);
    lodash.set(nextState, path, value);
    nextState = lodash.pick(
      nextState,
      getVisibleFields(fields, nextState, true),
    );

    onChange(nextState);
  };
}

FormEngine.propTypes = {
  formValue: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  fields: PropTypes.array.isRequired,
  verticalSpacing: PropTypes.number,
  templates: PropTypes.object,
};

FormEngine.defaultProps = {
  verticalSpacing: 16,
  templates: defaultTemplates,
};

export default FormEngine;

function getVisibleFields(fields, formValue, pathOnly = false) {
  return fields
    .filter(field => isFieldVisible(field, formValue))
    .map(field => (pathOnly ? field.path : field));
}

function isFieldVisible(field, formValue) {
  const {showOnlyWhen} = field;
  if (typeof showOnlyWhen === 'function') {
    const fieldValue = lodash.get(formValue, field.path);
    return showOnlyWhen(formValue, fieldValue);
  }

  if (typeof showOnlyWhen === 'object') {
    return validate(formValue, showOnlyWhen) === undefined;
  }

  if (typeof showOnlyWhen === 'undefined') {
    return true;
  }
}

function markErrorText(path, formValue, validation) {
  const constraint = {[path]: validation};
  const formResult = validate(formValue, constraint) || {};
  const fieldResult = formResult[path] || [];
  return fieldResult[0];
}
