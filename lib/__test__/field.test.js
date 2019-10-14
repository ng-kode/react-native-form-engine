import {act} from 'react-test-renderer';
import {makeRenderer} from './index.test';

describe('FormEngine', () => {
  test('should mark ChildComponent dirty when onChange is called', () => {
    const fields = [
      {path: 'username', template: 'TextField'},
      {path: 'email', template: 'TextField'},
    ];
    const onChange = jest.fn();
    const firstTextInput = makeRenderer({
      fields,
      onChange,
      formValue: {},
    }).root.findAllByProps({testID: 'form-engine-field'})[0];

    act(() => {
      firstTextInput.props.onChange('user123');
    });

    expect(firstTextInput.props.dirty).toBe(true);
  });

  test('should mark ChildComponent touched when onBlur is called', () => {
    const fields = [
      {path: 'username', template: 'TextField'},
      {path: 'email', template: 'TextField'},
    ];
    const onChange = jest.fn();
    const firstTextInput = makeRenderer({
      fields,
      onChange,
      formValue: {},
    }).root.findAllByProps({testID: 'form-engine-field'})[0];

    act(() => {
      firstTextInput.props.onBlur();
    });

    expect(firstTextInput.props.touched).toBe(true);
  });
});
