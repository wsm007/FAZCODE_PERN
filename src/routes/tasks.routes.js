import {Router} from 'express';

const router = Router();

router.get ('/tasks', (req, res) => res.send('Obteniendo tareas'));

router.get ('/tasks/:id', (req, res) => res.send('Obteniendo tarea única'));

router.post ('/tasks', (req, res) => res.send('Creando tarea'));

router.put ('/tasks/:id', (req, res) => res.send('Actualizando tarea única'));

router.patch ('/tasks/:id', (req, res) => res.send('Actualizando un valor de tarea única'));

router.delete ('/tasks/:id', (req, res) => res.send('Eliminando tarea'));


export default router;