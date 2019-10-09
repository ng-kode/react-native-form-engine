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

2. Define your fields
   ```
   const fields = [
       {
           "template": "Text",
           "customize": {
             "title": "客戶資料",
             "type": "h1"
           }
       },
       {
           "path": "userEmail",
           "template": "TextField",
           "customize": {
             "label": "你的電郵"
           }
       },
       // ...etc
   ]
   ```
3. Render `FormEngine`, pass in `fields`, together with `value` and a `onChange` handler

   ```
   class MyComponent extends React.Component {
       state = {
           value: {}
       }

       render() {
           <FormEngine
               fields={fields}
               value={this.state.value}
               onChange={value => this.setState({ value })}
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
