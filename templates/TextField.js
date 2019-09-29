import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';

const TextField = ({value, onChange, onBlur, errorText, touched, options}) => {
  const showError = touched && errorText;
  const styles = makeStyles(showError);
  const {label, ...rest} = options;

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.textInput}
        value={value}
        onBlur={onBlur}
        onChangeText={onChange}
        {...rest}
      />
      {showError && <Text style={styles.errorText}>{errorText}</Text>}
    </View>
  );
};

const makeStyles = showError =>
  StyleSheet.create({
    wrapper: {marginBottom: 16},
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