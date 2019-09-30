import React from 'react';
import {View, Text, Switch, StyleSheet} from 'react-native';

const SwitchField = ({fromEngine, customize}) => {
  const {value, onChange, errorText} = fromEngine;
  const {label} = customize;
  const showError = !!errorText;
  const styles = makeStyles(showError);

  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <Switch value={value} onValueChange={onChange} />
      {showError && <Text style={styles.errorText}>{errorText}</Text>}
    </View>
  );
};

const makeStyles = showError =>
  StyleSheet.create({
    label: {fontWeight: 'bold', ...(showError && {color: 'red'})},
    errorText: {color: 'red'},
  });

export default SwitchField;
