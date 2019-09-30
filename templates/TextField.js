import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';

const TextField = ({fromEngine, customize}) => {
  const {touched, errorText, onChange, ...rest} = fromEngine;
  const showError = touched && errorText;
  const styles = makeStyles(showError);
  const {label, ...restOptions} = customize;

  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.textInput}
        onChangeText={onChange}
        {...rest}
        {...restOptions}
      />
      {showError && <Text style={styles.errorText}>{errorText}</Text>}
    </View>
  );
};

const makeStyles = showError =>
  StyleSheet.create({
    label: {marginBottom: 4, fontWeight: 'bold'},
    textInput: {
      borderWidth: 1,
      borderColor: 'lightgrey',
      padding: 8,
      borderRadius: 4,
      ...(showError && {borderColor: 'red'}),
    },
    errorText: {color: 'red', fontSize: 12},
  });

export default TextField;
