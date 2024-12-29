import { z } from 'zod'

// Reusable schema for email validation
const emailSchema = z.string({
  required_error: 'El correo es requerido',
  invalid_type_error: 'El correo debe ser un texto'
}).email({ message: 'El correo debe ser un correo válido' })

// Reusable schema for password validation
const passwordSchema = z.string({
  required_error: 'La contraseña es requerido',
  invalid_type_error: 'La contraseña debe ser un texto'
}).min(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  .max(255, { message: 'La contraseña no puede exceder 255 caracteres' })

// Reusable schema for name validation
const nameSchema = z.string({
  required_error: 'El nombre es requerido',
  invalid_type_error: 'El nombre debe ser un texto'
}).min(1, { message: 'El nombre debe tener más de 1 carácter' })
  .max(255, { message: 'El nombre no puede exceder 255 caracteres' })

export const signupSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema
})

export const signinSchema = z.object({
  email: emailSchema,
  password: passwordSchema
})
