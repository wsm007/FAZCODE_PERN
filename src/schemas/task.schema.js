import { z } from 'zod'

export const createTaskSchema = z.object({
  title: z.string({
    required_error: 'El título es requerido',
    invalid_type_error: 'La descripción debe ser un texto'
  }).min(1).max(255),
  description: z.string({
    required_error: 'La descripción es requerida',
    invalid_type_error: 'La descripción debe ser un texto'
  }).min(1).max(255).optional()
})
