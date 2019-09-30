export default {
  email: {email: {message: '^INVALID_EMAIL'}},
  preferredOS: {exclusion: ['windows']},
  investmentPercent: {numericality: {greaterThanOrEqualTo: 5}},
};
