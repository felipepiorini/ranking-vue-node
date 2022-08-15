const express = require("express");
const app = express();
const cors = require("cors");
var bodyParser = require('body-parser')

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const port = 3000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

const knex = require("knex")({
  client: "mysql",
  connection: {
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "root",
    database: "ranking",
  },
});

app.get("/ranking/:id?", (req, res) => {
  idEscola = req.params.id ? req.params.id : 1;
  knex("alunos")
    .select({
      id: "a.id",
      nome: "a.nome",
      pontos: knex.raw("sum(r.ponto)"),
      quantidade: knex.raw("count(r.ponto)"),
    })
    .from("alunos as a")
    .leftJoin("ranking as r", "r.id_aluno", "a.id")
    .where ("a.escola_id", idEscola )
    .groupBy("a.id")
    .orderBy("pontos", "desc")
    .then((user) => {
      return res.json(user);
    })
    .catch((err) => {
      console.error(err);
      return res.json({
        success: false,
        message: "ocorreu um erro.",
      });
    });
});

app.post("/add", (req, res) => {

console.log(req.body)

knex('ranking').insert(req.body).then(() => {return res.send("Salvo com sucesso")})

});
