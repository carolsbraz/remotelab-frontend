const http = require("http")
const express = require("express")

const server = express()

server.use(express.static("public"))
server.set('view engine', 'ejs')
server.set('views', './src/views');

require(__dirname + "/routes/general-routes.js")(server);
require(__dirname + "/routes/clp-routes.js")(server);
require(__dirname + "/routes/fpga-routes.js")(server);

//ligar o servidor
http.createServer(server).listen(process.env.PORT || 3030, () => console.log("Servidor rodando"));