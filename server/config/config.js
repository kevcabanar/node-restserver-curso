//============
//Puerto
//============
process.env.PORT = process.env.PORT || 3000;

//============
//Entorno
//============
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//============
//Base de Datos
//============
let urlDB;
if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    // urlDB = 'mongodb+srv://kevin:Pruebas123@cafe-htqjd.mongodb.net/test?retryWrites=true&w=majority';

    urlDB = 'mongodb://cafe-user:Pruebas123@ds331145.mlab.com:31145/heroku_28jfstht';
    // urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;