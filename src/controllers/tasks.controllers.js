import { pool } from '../db.js'

// Obtener todas las tareas
export const getTasks = async (req, res) => {
    console.log(req.userId)
    const result = await pool.query('SELECt * FROM task')
    res.json(result.rows)
}

// Obtener una tarea única
export const getTask = async (req, res) => {
    const result = await pool.query('SELECT * FROM task WHERE id = $1', [
        req.params.id,
    ]);

    if (result.rowCount === 0) {
        return res.status(404).json({
            message: 'No existe una tarea con ese id'
        })
    }

    return res.json(result.rows[0]);
}

// crear una tarea
export const postTask = async (req, res, next) => {
    const { title, description } = req.body;

    try {
        const result = await pool.query('INSERT INTO task (title, description) VALUES ($1, $2) RETURNING *',
            [title, description])

        res.json(result.rows[0])
    } catch (error) {
        if (error.code === '23505') {
            return res.status(409).json({
                message: 'Ya existe una tarea con ese titulo'
            });
        }

        next(error)
    }
}

// Actualizar una tarea
export const putTask = async(req, res) => {
    const id = req.params.id;
    const { title, description } = req.body;

    const result = await pool.query('UPDATE task SET title = $1, description = $2 WHERE id = $3 RETURNING *', [title, description, id])
    
    if (result.rowCount === 0){
        return res.status(404).json({
            message: 'No existe una tarea con ese id'
        })
    }

    return res.json(result.rows[0]);
}

// Actualizar campos individuales de una tarea
export const patchTask = async (req, res) => {
    const id = req.params.id;
    const { title, description } = req.body;

    // Construir la consulta dinámica
    const updates = [];
    const values = [];
    let queryText = 'UPDATE task SET ';

    if (title !== undefined) {
        updates.push(`title = $${updates.length + 1}`);
        values.push(title);
    }

    if (description !== undefined) {
        updates.push(`description = $${updates.length + 1}`);
        values.push(description);
    }

    // Si no hay campos para actualizar, devolver error
    if (updates.length === 0) {
        return res.status(400).json({
            message: 'No se proporcionaron campos para actualizar'
        });
    }

    // Añadir el id como último parámetro
    queryText += updates.join(', ') + ` WHERE id = $${updates.length + 1} RETURNING *`;
    values.push(id);

    try {
        const result = await pool.query(queryText, values);

        if (result.rowCount === 0) {
            return res.status(404).json({
                message: 'No existe una tarea con ese id'
            });
        }

        return res.json(result.rows[0]);
    } catch (error) {
        // Manejar cualquier error de la base de datos
        return res.status(500).json({
            message: 'Error al actualizar la tarea',
            error: error.message
        });
    }
}

// Eliminar una tarea
export const deleteTask = async (req, res) => {
    const result = await pool.query('DELETE FROM task WHERE id = $1', [req.params.id]);

    if (result.rowCount === 0) {
        return res.status(404).json({
            message: 'No existe una tarea con ese id'
        })
    }

    return res.sendStatus(204);
}
