const express = require("express");
const router = express.Router();

router.post("/guardar", function (req, res) {
  let db = req.app.locals.db;
  db.collection("sistemas")
    .find({ sistema: req.body.system })
    .toArray(function (err, datos) {
      if (err !== null) {
        res.send({ error: true, contenido: err });
      } else {
        if (datos.length !== 0) {
          res.send({ error: false, mensaje: "ya existe", contenido: datos});
        } else {
          db.collection("sistemas").insertOne({
            sistema: req.body.system,
            planetas: []
          }, function(err2, datos2){
              if(err2){
                res.send({ error: true, contenido: err });
              }else{
                res.send({ estado: false, mensaje: "sistema guardado", contenido: datos2});
              }
          });
        }
      }
    });
});


router.put("/guardarplaneta", function (req, res) {
    let db = req.app.locals.db;
    let planeta = req.body.planeta;
    db.collection("sistemas")
      .updateOne({ sistema: req.body.sistema }, {$push: {planetas: {$each:[planeta]}}})
      res.send({mensaje: 'actualizado'})
});
     


router.delete('/borrar', function(req, res){
    let db = req.app.locals.db;
    db.collection('sistemas').find({sistema: req.body.sistema}).toArray(function(err, datos){
        if(err !== null){
            res.send({error: true, mensaje: err})
        }else{
            if(datos.length == 0){
                res.send({estado: false, mensaje: 'el sistema no esta registrado'})
            }else{
                db.collection('sistemas').deleteOne({sistema: req.body.sistema})
                res.send({estado: true, mensaje: 'sistema eliminado'})
            }
        }
    })
})


router.get('/mostrar', function(req, res){
    let db = req.app.locals.db;
    db.collection('sistemas').find().toArray(function(err, datos){
        if(err !== null){
            res.send({error: true, mensaje: err})
        }else{
            if(datos.length == 0){
                res.send({estado: false, mensaje: 'no se ha encontrado'})
            }else{
                
                res.send(datos);
            }
        }
    })
})

router.post('/mostrar/simulacion', function(req, res){
    let db = req.app.locals.db;
    db.collection('sistemas').find({sistema: req.body.sistema}).toArray(function(err, datos){
        if(err !== null){
            res.send({error: true, mensaje: err})
        }else{
            if(datos.length == 0){
                res.send({estado: false, mensaje: 'no se ha encontrado'})
            }else{
                res.send(datos);
            }
        }
    })
})


module.exports = router;
