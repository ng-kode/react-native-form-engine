import React from 'react';
import {SafeAreaView, View, Button} from 'react-native';
import FormEngine from 'react-native-form-engine';

const fields = [
  {
    template: 'Text',
    customize: {
      title: 'Hello, World',
      type: 'h1',
    },
  },
  {
    path: 'username',
    template: 'TextField',
    customize: {
      label: 'username',
    },
  },
];

const App = () => {
  const [value, setValue] = React.useState({});

  return (
    <SafeAreaView>
      <View style={{marginHorizontal: 16}}>
        <FormEngine fields={fields} value={value} onChange={setValue}>
          {({isFormDirty, isFormValid}) => (
            <View style={{margin: 16}}>
              <Button title="Send" disabled={!isFormDirty || !isFormValid} />
            </View>
          )}
        </FormEngine>
      </View>
    </SafeAreaView>
  );
};

export default App;
