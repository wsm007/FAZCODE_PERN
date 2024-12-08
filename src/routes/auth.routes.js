// import { Router } from 'express';
import Router from 'express-promise-router';
import { profile, signIn, signOut, signUp } from '../controllers/auth.controllers.js'
import { isAuth } from '../middlewares/auth.middleware.js'

const router = Router();

router.post('/signin', signIn);

router.post('/signup', signUp);

router.post('/signout', signOut);

router.get('/profile', isAuth, profile);

export default router;