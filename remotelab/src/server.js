const http = require("http")
const express = require("express")


const server = express()

server.use(express.static("public"))

const rotas = require(__dirname + "/rotas/general.js")(server);

//ligar o servidor
http.createServer(server).listen(process.env.PORT || 3000, () => console.log("Servidor rodando"));
