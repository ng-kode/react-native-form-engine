import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {CheckBox} from 'react-native-elements';
import Label from './__Label';

const MultipleCheckboxes = ({
  fromEngine: {value: currentValues = [], onChange, errorText},
  customize: {label: title, options, twoColumns = false},
}) => {
  const styles = makeStyles(twoColumns);
  return (
    <View>
      <Label title={title} />
      {!!errorText && <Text style={styles.errorText}>{errorText}</Text>}
      <View style={styles.checkboxesContainer}>
        {options.map(({label, value}) => (
          <View style={styles.checkboxContainer}>
            <CheckBox
              title={label}
              checked={currentValues.includes(value)}
              onPress={() =>
                onChange(
                  currentValues.includes(value)
                    ? currentValues.filter(v => v !== value)
                    : currentValues.concat(value),
                )
              }
            />
          </View>
        ))}
      </View>
    </View>
  );
};

const makeStyles = twoColumns =>
  StyleSheet.create({
    errorText: {
      color: 'red',
      marginBottom: 8,
    },
    checkboxesContainer: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    checkboxContainer: {
      width: twoColumns ? '50%' : '100%',
    },
  });

export default MultipleCheckboxes;
