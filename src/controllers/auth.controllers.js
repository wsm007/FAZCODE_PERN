import bcrypt from 'bcrypt'
import { pool } from '../db.js'
import { createAccessToken } from '../libs/jwt.js'

export const signIn = async (req, res) => {
  const { email, password } = req.body

  const result = await pool.query('SELECT * FROM users WHERE email = $1', [email])

  if (result.rowCount === 0) {
    return res.status(400).json({
      message: 'El correo no está registrado'
    })
  }

  const validPassword = await bcrypt.compare(password, result.rows[0].password)

  if (!validPassword) {
    return res.status(400).json({
      message: 'La contraseña es incorrecta'
    })
  }

  const token = await createAccessToken({ id: result.rows[0].id })

  res.cookie('token', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: 24 * 60 * 60 * 1000
  })

  // Omitir el envió del password al cliente
  delete result.rows[0].password
  return res.json(result.rows[0])
}

export const signUp = async (req, res, next) => {
  const { name, email, password } = req.body

  try {
    const hashedPassword = await bcrypt.hash(password, 10)

    const result = await pool.query('INSERT INTO users(name, email, password) VALUES($1, $2, $3) RETURNING *', [name, email, hashedPassword])

    const token = await createAccessToken({ id: result.rows[0].id })

    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 24 * 60 * 60 * 1000
    })

    // Omitir el envió del password al cliente
    delete result.rows[0].password
    return res.json(result.rows[0])
  } catch (error) {
    if (error.code === '23505') {
      return res.status(400).json({
        message: 'El email ya está registrado'
      })
    }

    next(error)
  }
}

export const signOut = (req, res) => {
  res.clearCookie('token').json({
    message: 'Logout con éxito'
  })
}

export const profile = async (req, res) => {
  const result = await pool.query('SELECT * FROM users WHERE id = $1', [req.userId])

  // Omitir el envió del password al cliente
  delete result.rows[0].password
  return res.json(result.rows[0])
}
