// import { Router } from 'express'
import Router from 'express-promise-router'

import { getTasks, getTask, postTask, putTask, patchTask, deleteTask } from '../controllers/tasks.controllers.js'
import { isAuth } from '../middlewares/auth.middleware.js'
import { validateSchema } from '../middlewares/validate.middleware.js'
import { createTaskSchema } from '../schemas/task.schema.js'

const router = Router()

router.get('/tasks', isAuth, getTasks)

router.get('/tasks/:id', isAuth, getTask)

router.post('/tasks', isAuth, validateSchema(createTaskSchema), postTask)

router.put('/tasks/:id', isAuth, putTask)

router.patch('/tasks/:id', isAuth, patchTask)

router.delete('/tasks/:id', isAuth, deleteTask)

export default router
