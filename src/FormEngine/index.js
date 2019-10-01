import React from 'react';
import PropTypes from 'prop-types';
import produce from 'immer';
import {View} from 'react-native';
import lodash from 'lodash';
import validate from 'validate.js';
import defaultTemplates from './templates';

class FormEngine extends React.Component {
  state = {
    errors: {},
    touched: {},
    dirty: {},
    isFormDirty: false,
  };

  getVisibleFields(state) {
    const {fields} = this.props;
    return fields.filter(
      ({showOnlyWhen}) => validate(state, showOnlyWhen) === undefined,
    );
  }

  getHiddenFields(state) {
    const {fields} = this.props;
    return fields.filter(
      ({showOnlyWhen}) => validate(state, showOnlyWhen) !== undefined,
    );
  }

  render() {
    const {children, value: currentState} = this.props;
    const visibleFields = this.getVisibleFields(currentState);

    return (
      <>
        {visibleFields.map((field, idx) => {
          this.throwInvalidField(field);
          return this.renderField(field, idx === visibleFields.length - 1);
        })}

        {typeof children === 'function'
          ? this.renderChildrenFunction()
          : children}
      </>
    );
  }

  throwInvalidField = field => {
    const {template} = field;

    if (!template) {
      throw Error(`template is missing for field ${JSON.stringify(field)}`);
    }
  };

  renderField = (field, isLast) => {
    const {template, path, customize: customizeRaw} = field;
    const {
      value: currentState,
      templates,
      verticalSpacing: marginBottom,
    } = this.props;
    const {errors, touched, dirty} = this.state;

    const Component = templates[template];
    const fromEngine = {
      value: lodash.get(currentState, path),
      onChange: value => this.handleChange(path, value),
      onBlur: () => this.handleBlur(path),
      touched: touched[path],
      dirty: dirty[path],
      errorText: (errors[path] || [])[0],
    };

    const customize = Object.keys(customizeRaw).reduce((acc, attr) => {
      const rawValue = customizeRaw[attr];
      if (rawValue.validation !== undefined) {
        const evaluatedValue =
          validate(currentState, rawValue.validation) === undefined;
        return {...acc, [attr]: evaluatedValue};
      } else {
        return {...acc, [attr]: rawValue};
      }
    }, {});

    return (
      <React.Fragment key={path || customize.title}>
        <View style={!isLast && {marginBottom}}>
          <Component fromEngine={fromEngine} customize={customize} />
        </View>
      </React.Fragment>
    );
  };

  renderChildrenFunction = () => {
    const {errors, isFormDirty} = this.state;
    const isFormValid = Object.keys(errors).length === 0;
    return this.props.children({isFormValid, isFormDirty});
  };

  handleChange = (path, value) => {
    this.setState({
      isFormDirty: true,
      dirty: {...this.state.dirty, [path]: true},
    });
    const {value: currentState, onChange} = this.props;

    let nextState = produce(currentState, draftState => {
      lodash.set(draftState, path, value);
    });

    const fieldsToHide = this.getHiddenFields(nextState);

    nextState = produce(nextState, draftState => {
      fieldsToHide.forEach(field => {
        lodash.unset(draftState, field.path);
      });
    });

    onChange(nextState);
    this.handleValidate(nextState);
  };

  handleValidate = nextState => {
    const {validation} = this.props;
    const errors = validate(nextState, validation) || {};
    this.setState({errors});
  };

  handleBlur = path => {
    const touched = produce(this.state.touched, draftTouched => {
      draftTouched[path] = true;
    });
    this.setState({touched});
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
