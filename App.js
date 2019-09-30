import React from 'react';
import {View, Button, StyleSheet, SafeAreaView, Text} from 'react-native';
import FormEngine from './FormEngine';

class App extends React.Component {
  state = {
    value: {},
  };

  render = () => {
    const {value} = this.state;

    return (
      <SafeAreaView>
        <View style={styles.container}>
          <FormEngine
            fields={[
              {
                template: 'TextField',
                path: 'username',
                customize: {
                  label: 'Username',
                },
              },
              {
                template: 'TextField',
                path: 'email',
                customize: {
                  label: 'Email',
                },
              },
              {
                template: 'TextField',
                path: 'password',
                customize: {
                  label: 'Password',
                  secureTextEntry: true,
                },
              },
              {
                template: 'TextField',
                path: 'confirmPassword',
                customize: {
                  label: 'Confirm Password',
                  secureTextEntry: true,
                },
              },
              {
                template: 'PickerField',
                path: 'preferredOS',
                customize: {
                  label: 'Your preferred OS',
                  options: [
                    {label: 'Mac OS', value: 'mac'},
                    {label: 'Windows', value: 'windows'},
                    {label: 'Linux', value: 'linux'},
                  ],
                },
              },
              {
                template: 'SliderField',
                path: 'investmentPercent',
                customize: {
                  label: 'Investment Percentage (%)',
                  minimumValue: 0,
                  maximumValue: 100,
                  step: 1,
                },
              },
            ]}
            value={value}
            onChange={this._onChange}
          />
          <Button title="Submit" onPress={this._onPress} />

          <View style={styles.spacer} />

          <View style={styles.codeDisplay}>
            <Text style={styles.title}>Form Value</Text>
            <Text>{JSON.stringify(value, null, 2)}</Text>
          </View>
        </View>
      </SafeAreaView>
    );
  };

  _onChange = value => {
    this.setState({value});
  };

  _onPress = () => {};
}

export default App;

const styles = StyleSheet.create({
  container: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  spacer: {
    height: 16,
  },
  codeDisplay: {
    backgroundColor: 'lightgrey',
    borderRadius: 4,
    padding: 8,
  },
});
