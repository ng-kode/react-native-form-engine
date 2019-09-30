import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Slider from '@react-native-community/slider';

const SliderField = ({fromEngine, options = {}}) => {
  const {value, onChange, errorText} = fromEngine;
  const {label, ...restOptions} = options;
  const showError = !!errorText;
  const styles = makeStyle(showError);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {label}: {value}
      </Text>
      <Slider value={value} onValueChange={onChange} {...restOptions} />
      {showError && <Text style={styles.errorText}>{errorText}</Text>}
    </View>
  );
};

const makeStyle = showError =>
  StyleSheet.create({
    container: {
      marginVertical: 16,
    },
    label: {
      fontWeight: 'bold',
      ...(showError && {color: 'red'}),
    },
    errorText: {
      color: 'red',
    },
  });

export default SliderField;
