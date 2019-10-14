# React Native Form Engine

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![npm version](https://img.shields.io/npm/v/react-native-form-engine.svg?style=flat)](https://www.npmjs.com/package/react-native-form-engine)
[![CircleCI](https://circleci.com/gh/ng-kode/react-native-form-engine/tree/master.svg?style=shield)](https://circleci.com/gh/ng-kode/react-native-form-engine/tree/master)

JSON-powered form generator

# Features

- Add customized templates with ease (for both inputs and ui components)
- inter-field validations
- Disable / Hide fields by conditions

# How to use

1. Install through npm / yarn

   ```
   $ cd <your-project-root>
   $ yarn install react-native-form-engine
   ```

2. Define your own fields and templates

   ```
   const fields = [
       {
           "path": "profileHeader",
           "template": "Text",
           "templateProps": {
             "title": "Your Profile",
             "type": "h1"
           }
       },
       {
           "path": "userEmail",
           "template": "TextField",
           "templateProps": {
             "label": "Your Email"
           }
       },
       // ...etc
   ]

   const templates = {
        Text: ({title, type}) => (
            <Text style={[type === 'h1' && {fontSize: 24}]}>{title}</Text>
        ),
        TextField: ({label, value, onChange}) => (
            <View style={{marginBottom: 16}}>
                <Text style={{fontWeight: 'bold'}}>{label}</Text>
                <TextInput value={value} onCh={onChange} />
            </View>
        ),
   };
   ```

3. Render `FormEngine`, pass in the following

   - `fields` array
   - `formValue` object
   - `onChange` handler
   - `templates` (optional, fallback to default templates if not provided)

   ```
   class MyComponent extends React.Component {
       state = {
           value: {}
       }

       render() {
           <FormEngine
               fields={fields}
               formValue={this.state.value}
               onChange={value => this.setState({ value })}
               templates={templates}
           />
       }
   }
   ```

   The fields will be rendered with their corresponding value (find by "path").

4. When user interacts with the form, `onChange` handler will be called with
   ```
   {
       userEmail: 'user123@example.com'
   }
   ```
   Then `MyComponent` will be responsible for updating `this.state.value`, thereby triggering the `render` method again and specific fields will be re-rendered (React's one-way binding).
