import {Router} from 'express';

const router = Router();

router.post ('/signin', (req, res) => res.send('Ingresando'));

router.post ('/signup', (req, res) => res.send('Registrando'));

router.post ('/signout', (req, res) => res.send('Cerrando sesion'));

router.get ('/profile', (req, res) => res.send('Cerrando sesion'));

export default router;