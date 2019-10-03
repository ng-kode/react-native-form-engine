import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {CheckBox} from 'react-native-elements';
import Label from './__Label';

const MultipleCheckboxes = ({
  fromEngine: {value: currentValues = [], onChange, errorText},
  customize: {label: title, options, twoColumns = false, hasBorder = false},
}) => {
  const styles = makeStyles(twoColumns);
  return (
    <View style={hasBorder && styles.container}>
      <Label title={title} />
      {!!errorText && <Text style={styles.errorText}>{errorText}</Text>}
      <View style={styles.checkboxesContainer}>
        {options.map(({label, value}) => (
          <View style={styles.checkboxContainer} key={value}>
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
    container: {
      borderWidth: 1,
      padding: 16,
      borderColor: 'lightgrey',
      borderRadius: 4,
    },
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
