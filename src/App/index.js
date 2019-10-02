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
import validation from './validation';

class App extends React.Component {
  state = {
    value: {},
  };

  render = () => {
    const {value} = this.state;

    return (
      <SafeAreaView>
        <ScrollView style={styles.container}>
          <View style={styles.row}>
            <View style={styles.codeDisplay}>
              <Text style={styles.title}>Form Value</Text>
              <Text>{JSON.stringify(value, null, 2)}</Text>
            </View>
            <View style={styles.formContainer}>
              <FormEngine
                fields={fields}
                validation={validation}
                value={value}
                onChange={this._onChange}>
                {({isFormValid, isFormDirty}) => (
                  <View style={styles.submitButtonWrapper}>
                    <Button
                      title="Submit"
                      onPress={this._onPress}
                      disabled={!isFormValid || !isFormDirty}
                    />
                  </View>
                )}
              </FormEngine>
            </View>
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
  row: {
    display: 'flex',
    flexDirection: 'row',
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
    margin: 16,
    flex: 1,
  },
  formContainer: {
    flex: 3,
    margin: 16,
  },
});
