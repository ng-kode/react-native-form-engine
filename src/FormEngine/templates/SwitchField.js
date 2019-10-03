import React from 'react';
import {View, Text, Switch, StyleSheet} from 'react-native';
import Label from './__Label';

const SwitchField = ({fromEngine, customize}) => {
  const {value, onChange, errorText, dirty} = fromEngine;
  const {label} = customize;
  const showError = !!errorText && dirty;
  const styles = makeStyles(showError);

  return (
    <View>
      <Label title={label} style={{...(showError && {color: 'red'})}} />
      <Switch value={value} onValueChange={onChange} />
      {showError && <Text style={styles.errorText}>{errorText}</Text>}
    </View>
  );
};

const makeStyles = showError =>
  StyleSheet.create({
    errorText: {color: 'red'},
  });

export default SwitchField;
