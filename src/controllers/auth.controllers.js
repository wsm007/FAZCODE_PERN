import bcrypt from 'bcrypt'
import { pool } from '../db.js'

export const signIn = (req, res) => res.send('Ingresando');

export const signUp = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10)
        console.log(hashedPassword)

        const result = await pool.query('INSERT INTO users(name, email, password) VALUES($1, $2, $3) RETURNING *', [name, email, hashedPassword])

        res.json(result.rows[0])
    } catch (error) {
        if (error.code === '23505') {
            return res.status(400).json({
                message: "El email ya está registrado"
            })
        }

    };
};

export const signOut = (req, res) => res.send('Cerrando sesion');

export const profile = (req, res) => res.send('Cerrando sesion');