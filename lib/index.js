import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import lodash from 'lodash';
import validate from 'validate.js';
import defaultTemplates from './templates';
import * as utils from './utils';

class FormEngine extends React.Component {
  state = {
    errors: {},
    touched: {},
    dirty: {},
    isFormDirty: false,
  };

  render() {
    const {children, value: currentState, fields} = this.props;
    const visibleFields = utils.getVisibleFields(fields, currentState);

    return (
      <>
        {visibleFields.map((field, idx) => {
          const addSpacing = idx !== visibleFields.length - 1;
          return this.renderField(field, addSpacing);
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

  renderField = (field, addSpacing) => {
    this.throwInvalidField(field);
    const {template, path, customize: customizeRaw = {}} = field;
    const {value: currentState, templates, verticalSpacing} = this.props;
    const {errors, touched, dirty} = this.state;
    const Component = templates[template];
    const customize = utils.evaluateCustomize(customizeRaw, currentState);

    return (
      <React.Fragment key={path || customize.title}>
        <View style={addSpacing && {marginBottom: verticalSpacing}}>
          <Component
            testID="form-engine-field"
            fromEngine={{
              value: lodash.get(currentState, path),
              onChange: value => this.handleChange(path, value),
              onBlur: () => this.handleBlur(path),
              touched: touched[path],
              dirty: dirty[path],
              errorText: (errors[path] || [])[0],
            }}
            customize={customize}
          />
        </View>
      </React.Fragment>
    );
  };

  renderChildren = () => {
    const {errors, isFormDirty} = this.state;
    const isFormValid = Object.keys(errors).length === 0;
    return this.props.children({isFormValid, isFormDirty});
  };

  handleChange = (path, value) => {
    this.markDirty(path);

    const {value: currentState, onChange, fields} = this.props;
    let nextState = utils.patchValue(path, value, currentState);
    const nextVisibleFields = utils.getVisibleFields(fields, nextState);
    nextState = lodash.pick(nextState, nextVisibleFields.map(f => f.path));

    onChange(nextState);
    this.handleValidate(nextState);
  };

  markDirty = path => {
    this.setState({
      isFormDirty: true,
      dirty: {...this.state.dirty, [path]: true},
    });
  };

  handleValidate = nextState => {
    const {validation} = this.props;
    const errors = validate(nextState, validation) || {};
    this.setState({errors});
  };

  handleBlur = path => {
    this.setState({touched: {...this.state.touched, [path]: true}});
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
