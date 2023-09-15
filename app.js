const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { get } = require('jquery');


// Configuración de EJS como motor de plantillas
app.set('view engine', 'ejs');

// Middleware para procesar datos del cuerpo de las solicitudes HTTP
app.use(bodyParser.urlencoded({ extended: true }));

// Directorio de archivos estáticos
app.use(express.static(__dirname + '/views'));

// Ruta de inicio de sesión
app.get('/', (req, res) => {
    res.render('login');
});

// Ruta de matriculas
app.post('/matriculas', (req, res) => {
    const usuario = req.body.usuario;
    const contrasena = req.body.contrasena;

    // Lógica para verificar el inicio de sesión y redireccionar a la vista de matriculas
    // Aquí puedes implementar la lógica de autenticación con la base de datos o cualquier otro método
    // Si la autenticación es exitosa, redirecciona a la vista de matriculas
    if (usuario === 'usuario' && contrasena === 'contrasena') {
        res.render('matriculas');
    } else {
        // Si la autenticación falla, puedes renderizar una vista de error o redireccionar a otra página
        res.render('login', { error: 'Usuario o contraseña incorrectos' });
    }
});

// Ruta de confirmacion de matriculas
app.post('/confirmacion', (req, res) => {
    const curso = req.body.curso;
    const medioPago = req.body.medioPago;

    function getPrecioCurso(curso) {
        switch (curso) {
            case 'Java':
                return 1200;
            case 'PHP':
                return 800;
            case '.NET':
                return 1500;
            default:
                return 0;
        }
    }
    const precioCurso = getPrecioCurso(curso);

    // Lógica para calcular el total a pagar
    let totalpagar = precioCurso;

    // Lógica para aplicar un descuento del 10% si el medio de pago es "Pago en efectivo"
    if (medioPago === 'Pago en efectivo') {
        totalpagar *= 0.1; 
    }

    // Lógica para procesar los datos y mostrar la vista de confirmación
    res.render('confirmacion', { curso, totalpagar, medioPago });
});



// Puerto en el que el servidor escucha las solicitudes
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
