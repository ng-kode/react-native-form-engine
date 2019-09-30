import React from 'react';
import {
  View,
  Button,
  StyleSheet,
  SafeAreaView,
  Text,
  ScrollView,
} from 'react-native';
import FormEngine from '../FormEngine';
import fields from './fields';
import constraints from './constraints';

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
            fields={fields}
            constraints={constraints}
            value={value}
            onChange={this._onChange}>
            {({isFormValid, isFormTouched}) => (
              <View style={styles.submitButtonWrapper}>
                <Button
                  title="Submit"
                  onPress={this._onPress}
                  disabled={!isFormValid || !isFormTouched}
                />
              </View>
            )}
          </FormEngine>
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
