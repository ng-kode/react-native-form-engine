import React from 'react';
import {SafeAreaView, View} from 'react-native';
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
    path: 'username',
    template: 'TextField',
    templateProps: {
      label: 'username',
    },
  },
];

const App = () => {
  const [value, setValue] = React.useState({});

  return (
    <SafeAreaView>
      <View style={{marginHorizontal: 16}}>
        <FormEngine fields={fields} formValue={value} onChange={setValue} />
      </View>
    </SafeAreaView>
  );
};

export default App;
