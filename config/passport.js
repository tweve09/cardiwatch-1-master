const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const db = require("./db");

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
  }, (username, password, done) => {
    db.query('SELECT * FROM cardiwatchdb.user_table WHERE username = ?', [username], (err, rows) => {
      if (err) { return done(err); }
      if (!rows.length) { return done(null, false, { message: 'Incorrect username' }); }
      bcrypt.compare(password, rows[0].password, (err, res) => {
        if (err) { return done(err); }
        if (!res) { return done(null, false, { message: 'Incorrect password.'}); }
        return done(null, rows[0]);
      });
    });
  }));
  
  // Serialize and deserialize user for sessions
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser((id, done) => {
    db.query('SELECT * FROM cardiwatchdb.user_table WHERE id = ?', [id], (err, rows) => {
      done(err, rows[0]);
    });
  });