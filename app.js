let host = "http://localhost:3000";

const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

// CONFIGURAÇÕES DE CONEXÃO COM O BANCO DE DADOS

const connection = mysql.createConnection({
   host: "localhost",
   user: "root",
   password: "",
   database: "projeto_gerenciador",
});

// CONECTAR AO BANCO DE DADOS

console.log("Conectando ao banco de dados...");
connection.connect((err) => {
   if (err) {
      console.error("Erro ao conectar ao banco de dados:", err);
      return;
   }
   console.log("Conexão ao banco de dados estabelecida com Sucesso.");
});
console.log(
   "Após a conexão com o banco de dados, tudo tranquilo até o momento."
);

// ROTA PARA OBTER TODAS AS TAREFAS

app.get("/tarefas", (req, res) => {
   console.log("Recebida solicitação para obter todas as tarefas...");
   const query = "SELECT * FROM tarefas";
   connection.query(query, (err, results) => {
      if (err) {
         console.error("Erro ao executar a consulta:", err);
         res.status(500).json({ error: "Erro ao buscar tarefas." });
         return;
      }
      console.log("Consulta executada com sucesso. Enviando resposta...");
      res.json(results);
   });
});

// ROTA PARA INSERIR UMA NOVA TAREFA

app.post("/tarefas", (req, res) => {
   console.log(req.body);


   // CORPO DA REQUISIÇÃO = req.body
   const { titulo, descricao } = req.body;

   const query = "INSERT INTO tarefas (titulo, descricao) VALUES (?, ?)";
   connection.query(query, [titulo, descricao], (err, results) => {
      if (err) {
         console.error("Erro ao executar a consulta:", err);
         res.status(500).json({ error: "Erro ao inserir nova tarefa." });
         return;
      }
      res.json({ message: "Nova tarefa Criada com sucesso." });
   });
});

// ATUALIZAR TAREFA

app.put("/tarefas/:id", (req, res) => {
   const taskId = req.params.id;
   const { titulo, descricao } = req.body;
   console.log(
      `Recebida solicitação para atualizar a tarefa com o ID ${taskId}...`
   );
   const query = "UPDATE tarefas SET titulo= ?, descricao = ? WHERE id = ?";
   connection.query(query, [titulo, descricao, taskId], (err, results) => {
      if (err) {
         console.error("Erro ao executar a consulta:", err);
         res.status(500).json({ error: "Erro ao atualizar a tarefa." });
         return;
      }
      console.log("Tarefa atualizada com sucesso. Enviando resposta...");
      res.json({ success: true, message: "Tarefa atualizada com sucesso." });
   });
});

app.patch("/tarefas/:id", (req, res) => {
   const taskId = req.params.id;
   const { titulo, descricao } = req.body;
   console.log(
      `Recebida solicitação para atualizar a tarefa com o ID ${taskId}...`
   );
   const query = "UPDATE tarefas SET titulo = ?, descricao = ? WHERE id = ?";
   connection.query(query, [titulo, descricao, taskId], (err, results) => {
      if (err) {
         console.error("Erro ao executar a consulta:", err);
         res.status(500).json({ error: "Erro ao atualizar a tarefa." });
         return;
      }
      console.log("Tarefa atualizada com sucesso. Enviando resposta...");
      res.json({ success: true, message: "Tarefa atualizada com sucesso." });
   });
});

//EXCLUIR TAREFA

app.delete("/tarefas/:id", (req, res) => {
   const taskId = req.params.id;
   console.log(
      `Recebida solicitação para excluir a tarefa com o ID ${taskId}...`
   );
   const query = "DELETE FROM tarefas WHERE id = ?";
   connection.query(query, [taskId], (err, results) => {
      if (err) {
         console.error("Erro ao executar a consulta:", err);
         res.status(500).json({ error: "Erro ao excluir a tarefa." });
         return;
      }
      console.log("Tarefa excluída com sucesso. Enviando resposta...");
      res.json({ success: true, message: "Tarefa excluída com sucesso." });
   });
});

// INICIE O SERVIDOR
const port = 3000;
app.listen(port, () => {
   console.log(`Servidor iniciado na porta http://localhost:3000/ ${port}.`);
});
