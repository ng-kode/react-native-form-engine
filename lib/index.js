import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import lodash from 'lodash';
import defaultTemplates from './templates';
import Field from './field';
import validatejsDefault from 'validate.js';

class FormEngine extends React.Component {
  render() {
    const {formValue, fields, verticalSpacing, validatejs} = this.props;
    const visibleFields = getVisibleFields(fields, formValue, validatejs);

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
    const {template, path, templateProps, validation = {}} = field;
    const {formValue, templates, validatejs} = this.props;
    const Component = templates[template];
    const fieldValue = lodash.get(formValue, path);

    return (
      <Field
        value={fieldValue}
        onChange={value => this.handleChange(path, value)}
        errorText={markErrorText(path, formValue, validation, validatejs)}
        Component={Component}
        {...templateProps}
      />
    );
  };

  handleChange = (path, value) => {
    const {formValue, onChange, fields, validatejs} = this.props;

    let nextState = lodash.cloneDeep(formValue);
    lodash.set(nextState, path, value);
    nextState = lodash.pick(
      nextState,
      getVisibleFields(fields, nextState, validatejs, true),
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
  validatejs: PropTypes.func,
};

FormEngine.defaultProps = {
  verticalSpacing: 16,
  templates: defaultTemplates,
  validatejs: validatejsDefault,
};

export default FormEngine;

function getVisibleFields(fields, formValue, validatejs, pathOnly = false) {
  return fields
    .filter(field => isFieldVisible(field, formValue, validatejs))
    .map(field => (pathOnly ? field.path : field));
}

function isFieldVisible(field, formValue, validatejs) {
  const {showOnlyWhen} = field;
  if (typeof showOnlyWhen === 'function') {
    const fieldValue = lodash.get(formValue, field.path);
    return showOnlyWhen(formValue, fieldValue);
  }

  if (typeof showOnlyWhen === 'object') {
    return validatejs(formValue, showOnlyWhen) === undefined;
  }

  if (typeof showOnlyWhen === 'undefined') {
    return true;
  }
}

function markErrorText(path, formValue, validation, validatejs) {
  const constraint = {[path]: validation};
  const formResult = validatejs(formValue, constraint) || {};
  const fieldResult = formResult[path] || [];
  return fieldResult[0];
}
