const express = require('express')
const fs = require('fs/promises')
const date = require('date-and-time')
const app = express()
const archivos = __dirname + "/archivos/"

app.listen(3000, () => console.log("App escuchando puerto 3000"))

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html")
})

app.get("/leer", (req, res) => {
  const { archivo } = req.query

  fs.readFile( "./archivos/" + archivo + ".txt", "utf-8")
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.send(err)
    })
})

app.get("/crear", (req, res) =>
  {
      const now = new Date()
      const {archivo, contenido} = req.query;
  
      fs.writeFile
      (
          './archivos/'+ archivo + '.txt',
          date.format(now, 'DD/MM/YYYY') + "\n" + contenido
      )
      .then(() => 
      {
          res.send("Archivo creado con exito.")
      })
      .catch(err =>
      {
          res.send("No fue posible crear el archivo.");
      })
  })


app.get("/renombrar", (req, res) => {
  const { nombre, nuevoNombre } = req.query

  fs.rename(
    "./archivos/" + nombre + ".txt",
    "./archivos/" + nuevoNombre + ".txt" 
  ).then(() => {
    res.send(`El archivo ${nombre} fue cambiado exitosamente por ${nuevoNombre}`)
  }).catch(err => {
    res.send(err)
  })
})

app.get("/eliminar", (req, res) => {
  const { archivo } = req.query

  // carpeta raíz proyecto .
  fs.unlink("./archivos/" + archivo + ".txt")
    .then(()  => {
      res.send("Archivo Eliminado con éxito")
    })
    .catch(err => {
      res.send("Problemas eliminando archivo")
    })
})

