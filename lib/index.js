import React from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import lodash from 'lodash';
import defaultTemplates from './templates';
import Field from './field';
import validate from 'validate.js';

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
        {/* <CodeSnippet code={JSON.stringify(currentState, null, 2)} /> */}
      </>
    );
  }

  renderField = field => {
    const {template, path, customize = {}} = field;
    const {formValue, templates} = this.props;
    const Component = templates[template];

    return (
      <Field
        fromEngine={{
          value: lodash.get(formValue, path),
          onChange: value => this.handleChange(path, value),
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

function CodeSnippet({code}) {
  const style = {
    backgroundColor: 'lightgrey',
    borderRadius: 8,
    padding: 16,
    marginVertical: 16,
  };

  return (
    <View style={style}>
      <Text>{code}</Text>
    </View>
  );
}
