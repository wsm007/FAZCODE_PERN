// import { Router } from 'express'
import Router from 'express-promise-router'
import { profile, signIn, signOut, signUp } from '../controllers/auth.controllers.js'
import { isAuth } from '../middlewares/auth.middleware.js'
import { validateSchema } from '../middlewares/validate.middleware.js'
import { signinSchema, signupSchema } from '../schemas/auth.schema.js'

const router = Router()

router.post('/signin', validateSchema(signinSchema), signIn)

router.post('/signup', validateSchema(signupSchema), signUp)

router.post('/signout', signOut)

router.get('/profile', isAuth, profile)

export default router
