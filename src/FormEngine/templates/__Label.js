import React from 'react';
import {Text, StyleSheet} from 'react-native';

const Label = ({title}) => <Text style={styles.title}>{title}</Text>;

const styles = StyleSheet.create({
  title: {marginBottom: 4, fontWeight: 'bold'},
});

export default Label;
