import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import lodash from 'lodash';
import defaultTemplates from './templates';
import * as utils from './utils';
import Field from './field';

class FormEngine extends React.Component {
  state = {
    isFormDirty: false,
  };

  render() {
    const {value: currentState, fields, verticalSpacing} = this.props;
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
      </>
    );
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
    const Component = templates[template];
    const customize = utils.evaluateCustomize(customizeRaw, currentState);

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
    this.setState({isFormDirty: true});

    const {value: currentState, onChange, fields} = this.props;

    let nextState = utils.patchValue(path, value, currentState);
    const nextVisibleFields = utils.getVisibleFields(fields, nextState);
    nextState = lodash.pick(nextState, nextVisibleFields.map(f => f.path));

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
