import { Router } from 'express';
import { profile, signIn, signOut, signUp } from '../controllers/auth.controllers.js'

const router = Router();

router.post('/signin', signIn);

router.post('/signup', signUp);

router.post('/signout', signOut);

router.get('/profile', profile);

export default router;