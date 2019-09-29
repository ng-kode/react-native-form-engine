import React from 'react';
import PropTypes from 'prop-types';
import produce from 'immer';
import lodash from 'lodash';
import validate from 'validate.js';
import templates from './templates';

const constraints = {
  email: {email: {message: '^INVALID_EMAIL'}},
  preferredOS: {exclusion: ['windows']},
};

class FormEngine extends React.Component {
  state = {
    errors: {},
    touched: {},
  };

  render() {
    const {fields, value: currentState} = this.props;
    const {errors, touched} = this.state;

    return (
      <>
        {fields.map(field => {
          this.throwInvalidField(field);
          const {template, path, options} = field;
          const Component = templates[template];
          const fieldValue = lodash.get(currentState, path);
          const errorText = (errors[path] || [])[0];

          return (
            <Component
              key={path}
              value={fieldValue}
              onChange={value => this.handleChange(path, value)}
              onBlur={() => this.handleBlur(path)}
              errorText={errorText}
              touched={touched[path]}
              options={options}
            />
          );
        })}
      </>
    );
  }

  throwInvalidField = field => {
    const {template, path, options} = field;

    if (!path) {
      throw Error(`path is missing for field ${JSON.stringify(field)}`);
    }

    if (!template) {
      throw Error(`template is missing for field ${JSON.stringify(field)}`);
    }
  };

  handleChange = (path, value) => {
    const {value: currentState, onChange} = this.props;
    const nextState = produce(currentState, draftState =>
      lodash.set(draftState, path, value),
    );
    onChange(nextState);
    this.handleValidate(nextState);
  };

  handleValidate = nextState => {
    const errors = validate(nextState, constraints) || {};
    this.setState({errors});
  };

  handleBlur = path => {
    const touched = produce(this.state.touched, draftTouched => {
      draftTouched[path] = true;
    });
    this.setState({touched});

    const {value: currentState} = this.props;
    this.handleValidate(currentState);
  };
}

FormEngine.propTypes = {
  value: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  fields: PropTypes.array.isRequired,
};

export default FormEngine;
