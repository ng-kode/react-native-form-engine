export default [
  {
    template: 'TextField',
    path: 'username',
    customize: {
      label: 'Username',
    },
  },
  {
    template: 'TextField',
    path: 'email',
    customize: {
      label: 'Email',
    },
  },
  {
    template: 'TextField',
    path: 'password',
    customize: {
      label: 'Password',
      secureTextEntry: true,
    },
  },
  {
    template: 'TextField',
    path: 'confirmPassword',
    customize: {
      label: 'Confirm Password',
      secureTextEntry: true,
    },
  },
  {
    template: 'PickerField',
    path: 'preferredOS',
    customize: {
      label: 'Your preferred OS',
      options: [
        {label: 'Mac OS', value: 'mac'},
        {label: 'Windows', value: 'windows'},
        {label: 'Linux', value: 'linux'},
      ],
    },
  },
  {
    template: 'SliderField',
    path: 'investmentPercent',
    customize: {
      label: 'Investment Percentage (%)',
      minimumValue: 0,
      maximumValue: 100,
      step: 1,
    },
  },
  {
    template: 'SwitchField',
    path: 'rememberMe',
    customize: {
      label: 'Remember Me',
    },
  },
];
