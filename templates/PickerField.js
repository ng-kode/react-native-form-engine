import React from 'react';
import {Picker, View, Text, StyleSheet} from 'react-native';

const PickerField = ({value: selectedValue, onChange, errorText, options}) => {
  const showError = !!errorText;
  const styles = makeStyles(showError);

  return (
    <View>
      <Text style={styles.label}>{options.label}</Text>
      <Picker
        style={styles.picker}
        selectedValue={selectedValue}
        onValueChange={itemValue => onChange(itemValue)}>
        {options.options.map(({label, value}) => (
          <Picker.Item key={value} label={label} value={value} />
        ))}
      </Picker>
      {showError && <Text style={styles.errorText}>{errorText}</Text>}
    </View>
  );
};

const makeStyles = showError =>
  StyleSheet.create({
    label: {marginBottom: 4, fontWeight: 'bold'},
    picker: {
      borderWidth: 1,
      borderColor: 'lightgrey',
      paddingHorizontal: 8,
      borderRadius: 4,
      ...(showError && {borderColor: 'red'}),
    },
    errorText: {color: 'red', fontSize: 12},
  });

export default PickerField;
