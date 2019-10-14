import React from 'react';
import {View, Text as RNText, StyleSheet} from 'react-native';

const Text = ({type, title}) => {
  const styles = makeStyles(type);

  return (
    <View>
      <RNText style={styles.text}>{title}</RNText>
    </View>
  );
};

const makeStyles = type =>
  StyleSheet.create({
    text: {
      fontSize: fontSizes[type],
    },
  });

const fontSizes = {
  h1: 48,
  h2: 34,
  h3: 24,
  body: 16,
};

export default Text;
