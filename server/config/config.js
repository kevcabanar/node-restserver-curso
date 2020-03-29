//============
//Puerto
//============
process.env.PORT = process.env.PORT || 3000;

//============
//Entorno
//============
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
//============
//Vencimiento del token 
//============
// 60 segundos
// 60 minutos
// 24 horas
// 30 dias
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

//============
//SEED de autentificacion
//============
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';

//============
//Base de Datos
//============
let urlDB;
if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    //Desarrollado en MongoDB atlas la nueva que absorbio a mlab
    // urlDB = 'mongodb+srv://kevin:Pruebas123@cafe-htqjd.mongodb.net/test?retryWrites=true&w=majority';

    //desarrollado con mlab su pagina antigua que esta anexada con heroku 
    // urlDB = 'mongodb://cafe-user:Pruebas123@ds331145.mlab.com:31145/heroku_28jfstht';
    urlDB = process.env.MONGO_URI;
    //se crea en heroku process.env.MONGO_URI
    // Para Listar heroku config
    //heroku config:set MONGO_URI="mongodb://cafe-user:Pruebas123@ds331145.mlab.com:31145/heroku_28jfstht"  
    //y asi ya no se ve en el github la cadena de conexion a BD
}

process.env.URLDB = urlDB;

//============
//Google Client ID
//============
process.env.CLIENT_ID = process.env.CLIENT_ID || '62774211357-fs0cn1kv9mahcv2mau59dkskt990b941.apps.googleusercontent.com';