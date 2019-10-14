import React from 'react';
import {Picker, View, Text, StyleSheet} from 'react-native';

const PickerField = ({errorText, dirty, label, value, onChange, options}) => {
  const showError = !!errorText && dirty;
  const styles = makeStyles(showError);

  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <Picker
        style={styles.picker}
        selectedValue={value}
        onValueChange={itemValue => onChange(itemValue)}>
        {options.map(option => (
          <Picker.Item key={value} label={option.label} value={option.value} />
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
