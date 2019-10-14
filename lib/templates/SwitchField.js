import React from 'react';
import {View, Text, Switch, StyleSheet} from 'react-native';

const SwitchField = ({dirty, errorText, label, value, onChange}) => {
  const showError = !!errorText && dirty;
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
