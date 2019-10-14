import React from 'react';
import FormEngine from '../index';

import TestRenderer, {act} from 'react-test-renderer';

export const makeRenderer = props =>
  TestRenderer.create(<FormEngine {...props} />);

describe('FormEngine', () => {
  test('should render null if fields = []', () => {
    const renderer = makeRenderer({
      fields: [],
      formValue: {},
      onChange: () => {},
    });
    expect(renderer.toJSON()).toBe(null);
  });

  test('should render custom fields', () => {
    const fields = [
      {path: 'username', template: 'TextField'},
      {path: 'email', template: 'TextField'},
    ];
    const root = makeRenderer({
      fields,
      formValue: {},
      onChange: () => {},
    }).root;
    expect(root.findAllByProps({testID: 'form-engine-field'}).length).toBe(2);
  });

  test('should render fields with values referenced from `formValue` props', () => {
    const fields = [
      {path: 'username', template: 'TextField'},
      {path: 'email', template: 'TextField'},
    ];
    const formValue = {username: 'super_123', email: 'thisisme@example.com'};
    const json = makeRenderer({
      fields,
      formValue,
      onChange: () => {},
    }).toJSON();
    expect(json).toMatchSnapshot();
  });

  test('should trigger onChange when template props onChange is called', () => {
    const fields = [
      {path: 'username', template: 'TextField'},
      {path: 'email', template: 'TextField'},
    ];
    const onChange = jest.fn();
    const firstTextInput = makeRenderer({
      fields,
      formValue: {},
      onChange,
    }).root.findAllByProps({testID: 'form-engine-field'})[0];

    act(() => {
      firstTextInput.props.onChange('user123');
    });

    expect(onChange).toBeCalledTimes(1);
    expect(onChange).toBeCalledWith({username: 'user123'});
  });

  test('should trigger onChange with correct `path` and `value`', () => {
    const fields = [
      {path: 'username', template: 'TextField'},
      {path: 'social.facebook', template: 'TextField'},
      {path: 'social.twitter', template: 'TextField'},
    ];

    const onChange = jest.fn();
    const [Username, SocialFb, SocialTwitter] = makeRenderer({
      fields,
      formValue: {},
      onChange,
    }).root.findAllByProps({testID: 'form-engine-field'});

    act(() => {
      Username.props.onChange('user123');
    });
    expect(onChange).toBeCalledWith({username: 'user123'});

    act(() => {
      SocialFb.props.onChange('me@fb.com');
    });
    expect(onChange).toBeCalledWith({social: {facebook: 'me@fb.com'}});

    act(() => {
      SocialTwitter.props.onChange('@tweetMeHere');
    });
    expect(onChange).toBeCalledWith({social: {twitter: '@tweetMeHere'}});
  });
});
