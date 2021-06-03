const express = require("express");
const router = express.Router();
const bcryprt = require("bcrypt");

router.post("/registrar", function (req, res) {
  let db = req.app.locals.db;
  let contrasena = req.body.contrasena;
  let contrasenaCifrada = bcryprt.hashSync(contrasena, 10);

  db.collection("usuarios")
    .find({ usuario: req.body.usuario })
    .toArray(function (err, datos) {
      if (err !== null) {
        res.send({ error: true, mensaje: err });
      } else {
        if (datos.length !== 0) {
          res.send({ error: false, mensaje: "el usuario ya existe, prueba con otro nombre", contenido: datos });
        } else {
          db.collection("usuarios").insertOne(
            {
              usuario: req.body.usuario,
              contrasena: contrasenaCifrada,
            },
            function (err2, datos2) {
              if (err2) {
                res.send({ error: true, mensaje: err2 });
              } else {
                res.send({
                  error: false,
                  mensaje: "usuario registrado",
                  contenido: datos2,
                });
              }
            }
          );
        }
      }
    });
});

router.post(`/entrar`, function (req, res) {
  let db = req.app.locals.db;
  let contrasena = req.body.contrasena;

  db.collection("usuarios")
    .find({ usuario: req.body.usuario })
    .toArray(function (err, datos) {
      if (err !== null) {
        res.send({ error: true, contenido: err });
      } else {
        if (datos.length !== 0) {
          let coincidencia = bcryprt.compareSync(
            contrasena,
            datos[0].contrasena
          );
            if(coincidencia){
                console.log(datos)
                res.send({ estado: true, mensaje: "", contenido: datos });
            }else{
                res.send({estado: false, mensaje: 'la contraseña es incorrecta'})
            }
        } else {
          res.send({ estado: false, mensaje: 'el usuario no está registrado'});
        }
      }
    });
});

module.exports = router;
