import React, {Component} from 'react';
import {ScrollView, AppRegistry} from 'react-native';
import FormEngine from './lib';

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

class App extends Component {
  state = {formValue: {}};

  render() {
    return (
      <ScrollView style={{paddingTop: 48, paddingHorizontal: 16}}>
        <FormEngine
          fields={fields}
          onChange={formValue => this.setState({formValue})}
          formValue={this.state.formValue}
        />
      </ScrollView>
    );
  }
}

AppRegistry.registerComponent('rn_form_engine', () => App);
