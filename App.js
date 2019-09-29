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
                options: {
                  label: 'Username',
                },
              },
              {
                template: 'TextField',
                path: 'email',
                options: {
                  label: 'Email',
                },
              },
              {
                template: 'TextField',
                path: 'password',
                options: {
                  label: 'Password',
                  secureTextEntry: true,
                },
              },
              {
                template: 'TextField',
                path: 'confirmPassword',
                options: {
                  label: 'Confirm Password',
                  secureTextEntry: true,
                },
              },
              {
                template: 'PickerField',
                path: 'preferredOS',
                options: {
                  label: 'Your preferred OS',
                  options: [
                    {label: 'Mac OS', value: 'mac'},
                    {label: 'Windows', value: 'windows'},
                    {label: 'Linux', value: 'linux'},
                  ],
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
