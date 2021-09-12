import passport from 'koa-passport';
import {Strategy as LocalStrategy} from 'passport-local';

const knex = require('./db/connection');

const options = {};


//serialize and deserialize the user information to the session
function configurePassport(){
    passport.serializeUser((user, done) => {
        done(null, user.id); 
    });
    
    passport.deserializeUser(async (id, done) => {
      try {
          const user = await knex('users').where({id}).first();
          done(null, user);
      } catch (err) {
          done (err, null);
      }
    });
    
    passport.use(new LocalStrategy(options, async (username, password, done) => {
      try {
        const user = await knex('users').where({ username }).first();
        if (!user) return done(null, false);
    
        if (password === user.password) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      } catch(err) {
        return done(err)
      }   
    }));
}

export {configurePassport}