import express from 'express';
import morgan from 'morgan';

const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get('/', (req, res) => res.json({
    message: 'Bienvenido a mi API'
}))

// // Provocando un error -- no aplicar en proyectos reales
// app.get('/test', (req, res) => {
//     throw new Error ('Error personalizado');
// })

// Para manejar errores con rutas erroneas
app.use((err, req, res, next) => {
    res.status(500).json({
        status: "Error",
        message: err.message
    })
})

export default app;