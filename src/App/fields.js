export default [
  {
    template: 'Text',
    customize: {
      title: 'Your Profile',
      type: 'h1',
    },
  },
  {
    template: 'TextField',
    path: 'username',
    customize: {
      label: 'Username',
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
      editable: {
        validation: {password: {presence: true}},
      },
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
    path: 'shouldEmailMe',
    template: 'SwitchField',
    customize: {
      label: 'Send me email',
    },
  },
  {
    path: 'myEmail',
    template: 'TextField',
    showOnlyWhen: {
      shouldEmailMe: {
        presence: true,
        inclusion: [true],
      },
    },
    customize: {
      label: 'Email',
      keyboardType: 'email-address',
    },
  },
];
