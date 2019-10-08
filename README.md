# React Native Form Engine

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![CircleCI](https://circleci.com/gh/ng-kode/react-native-form-engine/tree/master.svg?style=shield)](https://circleci.com/gh/ng-kode/react-native-form-engine/tree/master)

JSON-powered form generator

# Features

- Add customized templates with ease (for both inputs and ui components)
- inter-field validations
- Disable / Hide fields by conditions

# Installation

```
$ yarn install
$ cd ios && pod install
$ cd .. && react-native run-ios
```

# TODOs

- ✅Render custom form controls
- ✅Render custom ui components
- ✅Handle `value` and `onChange` through props (i.e. a **controlled** form)
- ✅Angular-like `touched` / `dirty`
- ✅Inter-fields validation
- ✅Show fields by condition
  - ✅remove value when hidden
- ✅Disable fields by condition
- ✅retrieve `isFormValid`, `isFormDirty` from `FormEngine`
- Array of Objects
- Auto-generate Doc
