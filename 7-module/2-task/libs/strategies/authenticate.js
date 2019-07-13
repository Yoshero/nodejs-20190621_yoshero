const User = require('../../models/User');

module.exports = async function authenticate(strategy, email, displayName, done) {
  try {
    if (!email) return done(null, false, 'Не указан email');
    const user = await User.findOne({email: email});
    if (!user) {
      const newUser = await User.create({
        email: email,
        displayName: displayName,
      });

      return done(null, newUser);
    }
    done(null, user);
  } catch (e) {
    done(e);
  }
};
