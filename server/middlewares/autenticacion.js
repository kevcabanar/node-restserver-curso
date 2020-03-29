const jwt = require('jsonwebtoken');
//======
//Verificar Token
//======
let verificaToken = (req, res, next) => {
    let token = req.get('token'); //el nombre del parametro
    // que se manda manual en el header
    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no valido'
                }
            });
        }
        req.usuario = decoded.usuario;
        next();
    });
}

// ==========
// verifica admin rol
// ==========
let verificaAdmin_Role = (req, res, next) => {
    let usuario = req.usuario;
    if (usuario.role === 'ADMIN_ROLE') {
        next();
    } else {
        return res.json({
            ok: false,
            err: {
                message: 'el usuario no es administrador'
            }
        });
    }

}

module.exports = {
    verificaToken,
    verificaAdmin_Role
}