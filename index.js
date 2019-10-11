import React, {Component} from 'react';
import {ScrollView, AppRegistry} from 'react-native';
import FormEngine from './lib';
import validatejs from 'validate.js';
import lodash from 'lodash';

const fields = [
  {
    path: 'header',
    template: 'Text',
    customize: {
      type: 'h1',
      title: 'Hello, World',
    },
  },
  {
    path: 'username',
    template: 'TextField',
    customize: {
      label: 'Username',
    },
  },
  {
    path: 'shouldNotifyByEmail',
    template: 'SwitchField',
    customize: {
      label: 'Receive notification ?',
    },
  },
  {
    path: 'userEmail',
    template: 'TextField',
    showOnlyWhen: formValue => formValue['shouldNotifyByEmail'] === true,
    customize: {
      label: 'Email',
    },
    validation: {email: true},
  },
  {
    path: 'investPercent',
    template: 'TextField',
    customize: {
      label: 'Investment Percentage',
    },
    validation: {numericality: true},
  },
  {
    path: 'reasonOver100',
    template: 'TextField',
    customize: {
      label: 'Please specify reason for > 100',
    },
    showOnlyWhen: {
      investPercent: {
        presence: true,
        numericality: {
          greaterThan: 100,
        },
      },
    },
  },
  {
    path: 'activity1',
    template: 'TextField',
    customize: {
      label: 'Eat',
    },
    validation: {
      numericality: true,
      spendAtLeastOne: {
        composition: ['activity1', 'activity2', 'activity3'],
      },
    },
  },
  {
    path: 'activity2',
    template: 'TextField',
    customize: {
      label: 'Walk',
    },
    validation: {
      numericality: true,
      spendAtLeastOne: {
        composition: ['activity1', 'activity2', 'activity3'],
      },
    },
  },
  {
    path: 'activity3',
    template: 'TextField',
    customize: {
      label: 'Sleep',
    },
    validation: {
      numericality: true,
      spendAtLeastOne: {
        composition: ['activity1', 'activity2', 'activity3'],
      },
    },
  },
];

validatejs.validators.spendAtLeastOne = (
  fieldValue,
  options,
  key,
  formValue,
) => {
  const {composition} = options;
  const values = composition.map(path => lodash.get(formValue, path) || 0);
  return values.reduce((acc, val) => acc + val, 0) > 0
    ? undefined
    : '^Spend time in at least one of them';
};

class App extends Component {
  state = {formValue: {}};

  render() {
    return (
      <ScrollView style={{paddingTop: 48, paddingHorizontal: 16}}>
        <FormEngine
          fields={fields}
          onChange={formValue => this.setState({formValue})}
          formValue={this.state.formValue}
          validatejs={validatejs}
        />
      </ScrollView>
    );
  }
}

AppRegistry.registerComponent('rn_form_engine', () => App);
