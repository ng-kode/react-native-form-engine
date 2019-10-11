import React from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import lodash from 'lodash';
import defaultTemplates from './templates';
import Field from './field';

class FormEngine extends React.Component {
  render() {
    const {value: currentState, fields, verticalSpacing} = this.props;
    const visibleFields = getVisibleFields(fields, currentState);

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
        <CodeSnippet code={JSON.stringify(currentState, null, 2)} />
      </>
    );
  }

  renderField = field => {
    const {template, path, customize} = field;
    const {value: currentState, templates} = this.props;
    const Component = templates[template];

    return (
      <Field
        fromEngine={{
          value: lodash.get(currentState, path),
          onChange: value => this.handleChange(path, value),
        }}
        customize={customize}
        Component={Component}
      />
    );
  };

  handleChange = (path, value) => {
    const {value: currentState, onChange, fields} = this.props;

    let nextState = lodash.cloneDeep(currentState);
    lodash.set(nextState, path, value);
    nextState = lodash.pick(
      nextState,
      getVisibleFields(fields, nextState, true),
    );

    onChange(nextState);
  };
}

FormEngine.propTypes = {
  value: PropTypes.object.isRequired,
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
  const {showOnlyWhen = () => true} = field;
  const fieldValue = lodash.get(formValue, field.path);
  return showOnlyWhen(formValue, fieldValue);
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
