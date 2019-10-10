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
    showOnlyWhen: {
      shouldNotifyByEmail: {
        presence: true,
        inclusion: [true],
      },
    },
    customize: {
      label: 'Email',
    },
  },
];

const validation = {
  userEmail: {
    email: true,
  },
};

class App extends Component {
  state = {formValue: {}};

  render() {
    return (
      <ScrollView style={{paddingTop: 48, paddingHorizontal: 16}}>
        <FormEngine
          fields={fields}
          onChange={formValue => this.setState({formValue})}
          value={this.state.formValue}
          validation={validation}
        />
      </ScrollView>
    );
  }
}

AppRegistry.registerComponent('rn_form_engine', () => App);
