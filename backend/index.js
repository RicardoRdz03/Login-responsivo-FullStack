const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: process.env.USER,
  password: process.env.PASS,
  host: process.env.HOST,
  database: process.env.DB,
});

const SECRET_KEY = "your_secret_key";

db.connect((err) => {
  if (err) {
    console.log("Hubo un error al conectar la base de datos", err);
  } else {
    console.log("Conectado a la base de datos");
  }
});

app.get("/", (request, response) => {
  response.send("Hola mundo");
});

app.post("/registrar", (request, response) => {
  const { nombre, apellido, correo, usuario, contraseña } = request.body;

  //Verifica que el correo no pertenezca a otro usuario
  db.query(
    "SELECT * FROM usuarios WHERE correo=?",
    [correo],
    (error, result) => {
      if (error) {
        console.log("Error en el servidor");
        return response.status(500).send("Error en el servidor");
      } else if (result.length > 0) {
        return response.status(400).send("El correo pertenece a otro usuario");
      } else {
        //verifica si el usuario ya existe
        db.query(
          "SELECT * FROM usuarios WHERE usuario=?",
          [usuario],
          (error, result) => {
            if (error) {
              console.error("Hubo un error en el servidor", error);
              return response.status(500).send("Hubo un error en el servidor");
            } else if (result.length > 0) {
              return response.status(409).send("El usuario ya existe");
            } else {
              //Registrar el usuario
              db.query(
                "INSERT INTO usuarios(nombre,apellidos,correo,usuario,contraseña) VALUES(?,?,?,?,?)",
                [nombre, apellido, correo, usuario, contraseña],
                (err, result) => {
                  if (err) {
                    console.log("No se pudo registrar el usuario", err);
                    return response
                      .status(500)
                      .send("No se pudo registrar el usuario");
                  } else {
                    return response.status(201).send("Usuario registrado");
                  }
                }
              );
            }
          }
        );
      }
    }
  );
});

app.post("/iniciar", (request, response) => {
  const { usuario, contraseña } = request.body;
  db.query(
    "SELECT * FROM usuarios WHERE usuario=? AND contraseña=?",
    [usuario, contraseña],
    (err, result) => {
      if (err) {
        console.log("Error en el servidor");
        return response.status(500).send("Error en el servidor");
      } else if (result.length > 0) {
        const token = jwt.sign({ id: result[0].id }, SECRET_KEY, {
          expiresIn: "1h",
        });
        response.send({ message: "Login exitoso", token });
      } else {
        return response.status(409).send("Usuario o contraseña incorrectos");
      }
    }
  );
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto: ${PORT}`);
});
