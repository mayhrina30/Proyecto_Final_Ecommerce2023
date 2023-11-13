const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();
const port = 3300;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'tu_secreto', resave: true, saveUninitialized: true }));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'postgres',
    password: 'admin',
    database: 'PostgresSQL 15'
});

connection.connect();

// Ruta para manejar el inicio de sesión
app.post('/iniciar-sesion', (req, res) => {
    const { email, password } = req.body;

    connection.query('SELECT * FROM usuarios WHERE email = ? AND password = ?', [email, password], (error, results) => {
        if (error) throw error;

        if (results.length > 0) {
            req.session.usuario = results[0];
            res.redirect('/productos');
        } else {
            res.send('Credenciales incorrectas');
        }
    });
});

// Ruta para cerrar sesión
app.get('/cerrar-sesion', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

// Ruta para productos (protegida)
app.get('/productos', (req, res) => {
    if (req.session.usuario) {
        // Si el usuario está autenticado, muestra la página de productos
        res.send('Página de productos. Usuario: ' + req.session.usuario.nombre);
    } else {
        // Si no, redirige al formulario de inicio de sesión
        res.redirect('/');
    }
});

app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});
