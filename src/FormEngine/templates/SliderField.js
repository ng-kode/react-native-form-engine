import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Slider from '@react-native-community/slider';
import Label from './__Label';

const SliderField = ({fromEngine, customize}) => {
  const {value, onChange, errorText, dirty} = fromEngine;
  const {label, ...restOptions} = customize;
  const showError = !!errorText && dirty;
  const styles = makeStyle(showError);

  return (
    <View>
      <Label title={`${label}: ${value}`} />
      {showError && <Text style={styles.errorText}>{errorText}</Text>}
      <Slider onValueChange={onChange} {...restOptions} />
    </View>
  );
};

const makeStyle = showError =>
  StyleSheet.create({
    label: {
      fontWeight: 'bold',
      ...(showError && {color: 'red'}),
    },
    errorText: {
      color: 'red',
      fontSize: 12,
    },
  });

export default SliderField;
