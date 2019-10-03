import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Label from './__Label';

const makeRadioButtonStyles = selected =>
  StyleSheet.create({
    roundBorder: {
      height: 24,
      width: 24,
      borderRadius: 12,
      borderWidth: 2,
      ...(selected && {borderColor: '#007bff'}),
      alignItems: 'center',
      justifyContent: 'center',
    },
    fill: {
      height: 12,
      width: 12,
      borderRadius: 6,
      backgroundColor: '#007bff',
    },
  });

const RadioButton = ({selected, style}) => {
  const styles = makeRadioButtonStyles(selected);
  return (
    <View style={[styles.roundBorder, style]}>
      {selected ? <View style={styles.fill} /> : null}
    </View>
  );
};

const RadioFieldStyles = StyleSheet.create({
  controlsWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  controlWrapper: {
    width: '49%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 4,
    backgroundColor: '#EEEEEE',
    marginBottom: 8,
  },
  optionLabel: {marginLeft: 8},
});

const RadioField = ({fromEngine, customize}) => {
  const {options, label: title} = customize;
  const {value: currentValue, onChange} = fromEngine;

  return (
    <View>
      <Label title={title} />
      <View style={RadioFieldStyles.controlsWrapper}>
        {options.map(({label, value}, i) => (
          <TouchableOpacity
            key={value}
            onPress={() => onChange(value)}
            style={RadioFieldStyles.controlWrapper}>
            <RadioButton selected={currentValue === value} />
            <Text style={RadioFieldStyles.optionLabel}>{label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default RadioField;
