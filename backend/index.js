// configurando variaveis de ambientes
require("dotenv").config();
const cors = require("cors");

// Importações
const express = require("express");
const app = express();

const conn = require("./src/data/conn");

// configurando o variaveis de ambiente para o sistema
require("dotenv").config();

// dados vindos do body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Resolvendo o cors
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(cors());

// Definindo diretorio publico
app.use(express.static("public"));

// routers
const funcionarioRoutes = require("./src/routes/funcionarioRoutes");
const eventoRoutes = require("./src/routes/eventoRoutes");
const responsavelRoutes = require("./src/routes/responsavelRoutes");
const pessoaTeaRoutes = require("./src/routes/pessoaTeaRoutes");
const feedbackRoutes = require("./src/routes/feedbackRoutes");
const authRoutes = require("./src/routes/authRoutes");
app.use("/func", funcionarioRoutes);
app.use("/evento", eventoRoutes);
app.use("/respon", responsavelRoutes);
app.use("/tea", pessoaTeaRoutes);
app.use("/feedback", feedbackRoutes);
app.use("/auth", authRoutes);

// porta do servidor
const port = process.env.PORT;

conn
  .sync({ force: false })
  .then(() => {
    app.listen(port);
  })
  .catch((err) => console.log(err));
