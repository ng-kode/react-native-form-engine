import React from 'react';
import {Text, StyleSheet} from 'react-native';

const Label = ({title, style}) => (
  <Text style={[styles.title, style]}>{title}</Text>
);

const styles = StyleSheet.create({
  title: {marginBottom: 4, fontWeight: 'bold'},
});

export default Label;
