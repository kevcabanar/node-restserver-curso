 const express = require('express');

 const { verificaToken, verificaAdmin_Role } = require('../middlewares/autenticacion');
 let app = express();
 const Categoria = require('../models/categoria');
 //////////////////////////////
 //Mostrar todas las categorias
 //////////////////////////////
 app.get('/categoria', verificaToken, (req, res) => {
     Categoria.find({}) // datos que se mostraran en el servicio
         .sort('descripcion') //ordena la data por "descripcion"
         .populate('usuario', 'nombre email') //permite cargar informacion de otra tabla
         //primer parametro es la tabla y el segundo es las columnas
         .exec((err, categoria) => {
             if (err) {
                 return res.status(400).json({
                     ok: false,
                     err
                 });
             }
             Categoria.countDocuments({}, (err, conteo) => {
                 res.json({
                     ok: true,
                     categoria,
                     cuantos: conteo
                 });
             });
         });
 });
 //////////////////////////////
 //Mostrar una categoria por ID
 //////////////////////////////
 app.get('/categoria/:id', verificaToken, (req, res) => {
     //Categoria.findById(...);
     let id = req.params.id;
     Categoria.findById(id, (err, categoriaDB) => {
         if (err) {
             return res.status(500).json({
                 ok: false,
                 err
             });
         }
         if (!categoriaDB) {
             return res.status(400).json({
                 ok: false,
                 err: 'El id no es correcto'
             });
         }
         res.json({
             ok: true,
             categoria: categoriaDB
         });
     })
 });
 //////////////////////////////
 //Crear nueva categoria
 //////////////////////////////
 app.post('/categoria', [verificaToken, verificaAdmin_Role], (req, res) => {
     //regresa la nueva categoria
     //req.usuario._id
     let body = req.body;
     let categoria = new Categoria({
         descripcion: body.descripcion,
         usuario: req.usuario._id
     });

     categoria.save((err, categoriaDB) => {
         if (err) {
             return res.status(400).json({
                 ok: false,
                 err
             });
         }
         if (!categoriaDB) {
             return res.status(500).json({
                 ok: false,
                 err
             });
         }
         res.json({
             ok: true,
             categoria: categoriaDB
         });
     });
 });
 //////////////////////////////
 //Actualizar el nombre de la categoria
 //////////////////////////////
 app.put('/categoria/:id', (req, res) => {
     let id = req.params.id;
     let body = req.body;
     let descCategoria = {
         descripcion: body.descripcion
     }
     Categoria.findByIdAndUpdate(id, descCategoria, { new: true, runValidators: true }, (err, categoriaDB) => {
         if (err) {
             return res.status(500).json({
                 ok: false,
                 err
             });
         }
         if (!categoriaDB) {
             return res.status(400).json({
                 ok: false,
                 err
             });
         }
         res.json({
             ok: true,
             categoria: categoriaDB
         });

     });

 });
 //////////////////////////////
 //Eliminar categoria
 //////////////////////////////
 app.delete('/categoria/:id', [verificaToken, verificaAdmin_Role], (req, res) => {
     //solo un administrador puede borrar categorias
     //Categoria.findByIdAndRemove
     let id = req.params.id;
     Categoria.findByIdAndRemove(id, (err, categoriaDB) => {
         if (err) {
             return res.status(500).json({
                 ok: false,
                 err
             });
         }
         if (!categoriaDB) {
             return res.status(400).json({
                 ok: false,
                 err: 'el ID no existe'
             });
         }
         res.json({
             ok: true,
             menssage: 'Categoria borrada'
         });

     });
 });


 module.exports = app;