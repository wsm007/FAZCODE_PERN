// Importaciones de módulos necesarios
import express from 'express'; // Framework web para Node.js
import morgan from 'morgan';   // Middleware de registro de solicitudes HTTP
import taskRoutes from './routes/tasks.routes.js'
import authRoutes from './routes/auth.routes.js'
// Crear una instancia de la aplicación Express
const app = express();

// Configuración de Middlewares ============
// morgan('dev'): Middleware para registro de solicitudes en formato de desarrollo
app.use(morgan('dev'));

// Middleware para parsear cuerpos de solicitudes JSON
app.use(express.json());

// Middleware para parsear cuerpos de solicitudes codificados en URL
// extended: false significa que se utilizará la librería querystring para parsear
app.use(express.urlencoded({ extended: false }));

// Ruta raíz (/) que devuelve un mensaje de bienvenida en formato JSON
app.get('/', (req, res) => res.json({
    message: 'Bienvenido a mi API'
}));

// Routes ============
app.use('/api', taskRoutes);
app.use('/api', authRoutes);

// Error Handler ==========
// Captura cualquier error que ocurra en las rutas anteriores
app.use((err, req, res, next) => {
    // Responde con un código de estado 500 (Error interno del servidor)
    // y un objeto JSON con detalles del error
    res.status(500).json({
        status: "Error",
        message: err.message
    });
});

// Exportar la aplicación Express para ser utilizada en otros archivos
export default app;