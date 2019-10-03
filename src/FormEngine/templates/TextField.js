import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';

const TextField = ({fromEngine, customize}) => {
  const {touched, errorText, onChange, onBlur, ...rest} = fromEngine;
  const {label, editable = true, ...restOptions} = customize;

  const showError = touched && errorText;
  const [isFocusing, setIsFocusing] = React.useState(false);
  const styles = makeStyles({showError, isFocusing, editable});

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.textInput}
        onChangeText={onChange}
        onFocus={() => setIsFocusing(true)}
        onBlur={() => {
          setIsFocusing(false);
          onBlur();
        }}
        editable={editable}
        {...rest}
        {...restOptions}
      />
      {showError && <Text style={styles.errorText}>{errorText}</Text>}
    </View>
  );
};

const makeStyles = ({showError, isFocusing, editable}) =>
  StyleSheet.create({
    container: {
      width: 240,
      ...(!editable && {opacity: 0.5}),
    },
    label: {marginBottom: 4, fontWeight: 'bold'},
    textInput: {
      borderWidth: 1,
      borderColor: isFocusing ? '#007bff' : 'lightgrey',
      padding: 8,
      borderRadius: 4,
      ...(showError && {borderColor: 'red'}),
      ...(!editable && {backgroundColor: '#EEEEEE'}),
    },
    errorText: {color: 'red', fontSize: 12},
  });

export default TextField;
