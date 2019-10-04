export default {
  myEmail: {
    email: {message: '^INVALID_EMAIL'},
  },
  preferredOS: {
    exclusion: ['windows'],
  },
  confirmPassword: {
    presence: true,
    equality: 'password',
  },
};
