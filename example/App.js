import React from 'react';
import {SafeAreaView, View, ScrollView, Text, StyleSheet} from 'react-native';
import FormEngine from 'react-native-form-engine';

const fields = [
  {
    path: 'header',
    template: 'Text',
    templateProps: {
      title: 'Hello, World',
      type: 'h1',
    },
  },
  {
    path: 'yourName',
    template: 'TextField',
    templateProps: {
      label: 'Your name',
    },
  },
  {
    path: 'favoriteSportd',
    template: 'PickerField',
    templateProps: {
      label: 'Favorite Sports',
      options: [
        {label: 'Basketball', value: 'basketball'},
        {label: 'Football', value: 'football'},
        {label: 'Badminton', value: 'badminton'},
        {label: 'Tennis', value: 'tennis'},
        {label: 'Ice Skating', value: 'iceSkating'},
      ],
    },
  },
  {
    path: 'shouldRememberMe',
    template: 'SwitchField',
    templateProps: {
      label: 'Remember Me',
    },
  },
];

const App = () => {
  const [value, setValue] = React.useState({});

  return (
    <JustWrapper json={value}>
      <FormEngine fields={fields} formValue={value} onChange={setValue} />
    </JustWrapper>
  );
};

export default App;

const JustWrapper = ({children, json}) => (
  <SafeAreaView style={styles.flex1}>
    <ScrollView style={styles.flex1}>
      <View style={styles.marginHori16}>
        {children}
        <CodeSnippet json={json} />
      </View>
    </ScrollView>
  </SafeAreaView>
);

const CodeSnippet = ({json}) => {
  return (
    <View style={styles.codeSnippet}>
      <Text>{JSON.stringify(json, null, 2)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  flex1: {flex: 1},
  marginHori16: {marginHorizontal: 16},
  codeSnippet: {
    backgroundColor: 'lightgrey',
    borderRadius: 8,
    padding: 16,
    marginTop: 16,
  },
});
