import React from 'react';
import {
  View,
  Button,
  StyleSheet,
  SafeAreaView,
  Text,
  ScrollView,
} from 'react-native';
import FormEngine from './FormEngine';

class App extends React.Component {
  state = {
    value: {},
  };

  render = () => {
    const {value} = this.state;

    return (
      <SafeAreaView>
        <ScrollView style={styles.container}>
          <View style={styles.codeDisplay}>
            <Text style={styles.title}>Form Value</Text>
            <Text>{JSON.stringify(value, null, 2)}</Text>
          </View>
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
              {
                template: 'SwitchField',
                path: 'rememberMe',
                customize: {
                  label: 'Remember Me',
                },
              },
            ]}
            value={value}
            onChange={this._onChange}
          />

          <View style={styles.submitButtonWrapper}>
            <Button title="Submit" onPress={this._onPress} />
          </View>
        </ScrollView>
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
    paddingHorizontal: 16,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  submitButtonWrapper: {
    marginVertical: 16,
  },
  codeDisplay: {
    backgroundColor: 'lightgrey',
    borderRadius: 4,
    padding: 8,
    marginVertical: 16,
  },
});
