const http = require("http")
const express = require("express")

const server = express()

var bodyParser = require('body-parser');

var cors = require('cors')

server.use(cors({credentials: true, origin: 'http://localhost:3000/'}))


server.use(express.static("public"))
server.set('view engine', 'ejs')
server.set('views', './src/views');

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));



const rotas = require(__dirname + "/rotas/general.js")(server);

//ligar o servidor
http.createServer(server).listen(process.env.PORT || 3000, () => console.log("Servidor rodando"));