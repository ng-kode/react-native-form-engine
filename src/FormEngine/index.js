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
  };

  render() {
    const {
      fields,
      value: currentState,
      verticalSpacing: marginBottom,
      templates,
    } = this.props;
    const {errors, touched} = this.state;
    const makeSpacing = idx =>
      idx === fields.length - 1 ? {} : {marginBottom};

    return (
      <>
        {fields.map((field, idx) => {
          this.throwInvalidField(field);
          const {
            template,
            path,
            customize: customizeRaw,
            showOnlyWhen = () => true,
          } = field;
          if (!showOnlyWhen(currentState)) {
            return;
          }

          const customize =
            typeof customizeRaw === 'function'
              ? customizeRaw(currentState)
              : customizeRaw;
          const key = path || customize.title;
          const Component = templates[template];
          const fromEngine = {
            value: lodash.get(currentState, path),
            onChange: value => this.handleChange(path, value),
            onBlur: () => this.handleBlur(path),
            touched: touched[path],
            errorText: (errors[path] || [])[0],
          };

          return (
            <React.Fragment key={key}>
              <View style={makeSpacing(idx)}>
                <Component fromEngine={fromEngine} customize={customize} />
              </View>
            </React.Fragment>
          );
        })}
      </>
    );
  }

  throwInvalidField = field => {
    const {template} = field;

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
    const {constraints} = this.props;
    const errors = validate(nextState, constraints) || {};
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
  constraints: PropTypes.object,
  verticalSpacing: PropTypes.number,
  templates: PropTypes.object,
};

FormEngine.defaultProps = {
  constraints: {},
  verticalSpacing: 16,
  templates: defaultTemplates,
};

export default FormEngine;
