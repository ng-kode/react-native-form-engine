// import 'react-native';
import React from 'react';
import FormEngine from '../index';

import TestRenderer from 'react-test-renderer';

describe('FormEngine', () => {
  test('should render null if fields = []', () => {
    const fields = [];
    const json = TestRenderer.create(
      <FormEngine value={{}} onChange={() => {}} fields={fields} />,
    ).toJSON();
    expect(json).toBe(null);
  });

  test('should render custom fields', () => {
    const fields = [
      {path: 'username', template: 'TextField'},
      {path: 'email', template: 'TextField'},
    ];
    const json = TestRenderer.create(
      <FormEngine value={{}} onChange={() => {}} fields={fields} />,
    ).toJSON();
    expect(json.length).toBe(2);
    expect(json).toMatchSnapshot();
  });

  test('should render fields with values referenced from `value` props', () => {
    const fields = [
      {path: 'username', template: 'TextField'},
      {path: 'email', template: 'TextField'},
    ];
    const value = {username: 'super_123', email: 'thisisme@example.com'};
    const json = TestRenderer.create(
      <FormEngine value={value} onChange={() => {}} fields={fields} />,
    ).toJSON();
    expect(json).toMatchSnapshot();
  });

  test('should provide each custom field with props `fromEngine` and `customize`', () => {
    const fields = [
      {path: 'username', template: 'TextField'},
      {path: 'email', template: 'TextField'},
    ];
    const Fields = TestRenderer.create(
      <FormEngine value={{}} onChange={() => {}} fields={fields} />,
    ).root.findAllByProps({testID: 'form-engine-field'});
    expect(Fields.every(f => f.props.fromEngine !== undefined)).toBe(true);
    expect(Fields.every(f => f.props.customize !== undefined)).toBe(true);
  });

  test('should trigger onChange when template props onChange is called', () => {
    const fields = [
      {path: 'username', template: 'TextField'},
      {path: 'email', template: 'TextField'},
    ];
    const onChange = jest.fn();
    const firstTextInput = TestRenderer.create(
      <FormEngine value={{}} onChange={onChange} fields={fields} />,
    ).root.findAllByProps({testID: 'form-engine-field'})[0];

    firstTextInput.props.fromEngine.onChange('user123');
    expect(onChange).toBeCalledTimes(1);
    expect(onChange).toBeCalledWith({username: 'user123'});
  });
});
