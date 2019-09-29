import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';

const templates = {
  TextField: ({label, onChange, hasError, errorText, touched, ...rest}) => {
    const showError = touched && hasError;
    const styles = StyleSheet.create({
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

    return (
      <View style={styles.wrapper}>
        <Text style={styles.label}>{label}</Text>
        <TextInput style={styles.textInput} onChangeText={onChange} {...rest} />
        {showError && <Text style={styles.errorText}>{errorText}</Text>}
      </View>
    );
  },
};

export default templates;
