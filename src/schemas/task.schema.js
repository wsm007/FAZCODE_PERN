import { z } from 'zod'

// Reusable schema for title validation
const titleSchema = z.string({
  required_error: 'El título es requerido',
  invalid_type_error: 'El título debe ser un texto'
}).min(1, { message: 'El título debe tener al menos 1 carácter' })
  .max(255, { message: 'El título no puede exceder 255 caracteres' })

// Reusable schema for description validation
const descriptionSchema = z.string({
  required_error: 'La descripción es requerida',
  invalid_type_error: 'La descripción debe ser un texto'
}).min(1, { message: 'La descripción debe tener al menos 1 carácter' })
  .max(255, { message: 'La descripción no puede exceder 255 caracteres' })

export const createTaskSchema = z.object({
  title: titleSchema,
  description: descriptionSchema.optional()
})

export const updaTaskSchema = z.object({
  title: titleSchema.optional(),
  description: descriptionSchema.optional()
})
