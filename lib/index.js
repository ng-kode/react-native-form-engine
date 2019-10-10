import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import lodash from 'lodash';
import validate from 'validate.js';
import defaultTemplates from './templates';
import * as utils from './utils';
import Field from './field';

class FormEngine extends React.Component {
  state = {
    errors: {},
    isFormDirty: false,
  };

  render() {
    const {children, value: currentState, fields, verticalSpacing} = this.props;
    const visibleFields = utils.getVisibleFields(fields, currentState);

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

        {typeof children === 'function' ? this.renderChildren() : children}
      </>
    );
  }

  componentDidMount() {
    this.handleValidate(this.props.value);
  }

  throwInvalidField = field => {
    const {template} = field;

    if (!template) {
      throw Error(`template is missing for field ${JSON.stringify(field)}`);
    }
  };

  renderField = field => {
    this.throwInvalidField(field);
    const {template, path, customize: customizeRaw = {}} = field;
    const {value: currentState, templates} = this.props;
    const {errors} = this.state;
    const Component = templates[template];
    const customize = utils.evaluateCustomize(customizeRaw, currentState);

    return (
      <Field
        fromEngine={{
          value: lodash.get(currentState, path),
          onChange: value => this.handleChange(path, value),
          errorText: (errors[path] || [])[0],
        }}
        customize={customize}
        Component={Component}
      />
    );
  };

  renderChildren = () => {
    const {errors, isFormDirty} = this.state;
    const isFormValid = Object.keys(errors).length === 0;
    return this.props.children({isFormValid, isFormDirty});
  };

  handleChange = (path, value) => {
    this.setState({isFormDirty: true});

    const {value: currentState, onChange, fields} = this.props;

    let nextState = utils.patchValue(path, value, currentState);
    const nextVisibleFields = utils.getVisibleFields(fields, nextState);
    nextState = lodash.pick(nextState, nextVisibleFields.map(f => f.path));

    onChange(nextState);
    this.handleValidate(nextState);
  };

  handleValidate = nextState => {
    const {validation} = this.props;
    const errors = validate(nextState, validation) || {};
    this.setState({errors});
  };
}

FormEngine.propTypes = {
  value: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  fields: PropTypes.array.isRequired,
  validation: PropTypes.object,
  verticalSpacing: PropTypes.number,
  templates: PropTypes.object,
};

FormEngine.defaultProps = {
  validation: {},
  verticalSpacing: 16,
  templates: defaultTemplates,
};

export default FormEngine;
