const express = require('express')
const nunjucks = require('nunjucks')
const routes = require("./routes")
const methodOverride = require('method-override')

const server = express()

// Essa linha serve para conseguir interpretar o req.body, no POST
server.use(express.urlencoded({ extended: true }))
server.use(express.static('public'))
server.use(methodOverride('_method'))
server.use(routes)

server.set("view engine", "njk")

nunjucks.configure("src/app/views", {
    express:server,
    autoescape: false,
    noCache: true
})

// Usando o package 'nodemon' para manter o servidor em execução e atualizar automaticamente
server.listen(5000, function () {
    console.log("server is running.")
})