// configurando variaveis de ambientes
require("dotenv").config();

// Importações
const express = require("express");
const app = express();

const conn = require("./src/data/conn");

// configurando o variaveis de ambiente para o sistema
require("dotenv").config();

// dados vindos do body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routers
const funcionarioRoutes = require("./src/routes/funcionarioRoutes");
const eventoRoutes = require("./src/routes/eventoRoutes");
const responsavelRoutes = require("./src/routes/responsavelRoutes");
const pessoaTeaRoutes = require("./src/routes/pessoaTeaRoutes");
const feedbackRoutes = require("./src/routes/feedbackRoutes");
app.use("/func", funcionarioRoutes);
app.use("/evento", eventoRoutes);
app.use("/respon", responsavelRoutes);
app.use("/tea", pessoaTeaRoutes);
app.use("/feedback", feedbackRoutes);

// porta do servidor
const port = process.env.PORT;

conn
  .sync({ force: false })
  .then(() => {
    app.listen(port);
  })
  .catch((err) => console.log(err));
