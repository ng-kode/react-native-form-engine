import React from 'react';
import FormEngine from '../index';
import TestRenderer, {act} from 'react-test-renderer';

describe('FormEngine', () => {
  test('should mark ChildComponent dirty when onChange is called', () => {
    const fields = [
      {path: 'username', template: 'TextField'},
      {path: 'email', template: 'TextField'},
    ];
    const onChange = jest.fn();
    const firstTextInput = TestRenderer.create(
      <FormEngine value={{}} onChange={onChange} fields={fields} />,
    ).root.findAllByProps({testID: 'form-engine-field'})[0];

    act(() => {
      firstTextInput.props.fromEngine.onChange('user123');
    });

    expect(firstTextInput.props.fromEngine.dirty).toBe(true);
  });

  test('should mark ChildComponent touched when onBlur is called', () => {
    const fields = [
      {path: 'username', template: 'TextField'},
      {path: 'email', template: 'TextField'},
    ];
    const onChange = jest.fn();
    const firstTextInput = TestRenderer.create(
      <FormEngine value={{}} onChange={onChange} fields={fields} />,
    ).root.findAllByProps({testID: 'form-engine-field'})[0];

    act(() => {
      firstTextInput.props.fromEngine.onBlur();
    });

    expect(firstTextInput.props.fromEngine.touched).toBe(true);
  });
});
