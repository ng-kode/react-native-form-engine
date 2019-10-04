import React from 'react';
import {View, Button, StyleSheet, SafeAreaView, ScrollView} from 'react-native';
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
});
