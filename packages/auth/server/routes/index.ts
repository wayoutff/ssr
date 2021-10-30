import express from 'express'
import UserModel from '../model'
import passport from 'passport'

const router = express.Router();

//log in route
router.post('/login', async (req, res, next) => {
  passport.authenticate('login', async (error, user, info) => {
    try {
      if (error) {
        return res.status(500).json({
          message: 'Something is wrong',
          error: error || 'internal server errror',
        });
      }

      //req.login is provided by passport to serilize user id
      req.login(user, async (error) => {
        if (error) {
          res.status(500).json({
            message: 'Somthing is wrong',
            error: error || 'internal server errror',
          });
        }

        return res.send({ user, info });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

//sign up route
router.post('/signup', async (req, res, next) => {
  passport.authenticate('signup', async (error, user, info) => {
    console.log('1')
    try {
      if (error) {
        console.log(error, '?')
        return res.status(500).json({
          message: 'Somthing is wrong',
          error: error || 'internal server errror',
        });
      }

      console.log(req, '2')
      req.login(user, async (error) => {
        if (error) {
          res.status(500).json({
            message: 'Somthing is wrong',
            error: error || 'internal server errror',
          });
        }

        console.log('3')
        return res.json({ user, info });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

//to check if the user is authenticated
router.get('/login_check', (req, res, next) => {
  if (!req.user) {
    console.log('??')
    res.send({})
    return
  }
  res.json(req.user);
  console.log('sd?')
});

//log out
router.get('/logout', async (req, res) => {
  req.logout();
  res.json({ message: 'logged out' });
});

export default router