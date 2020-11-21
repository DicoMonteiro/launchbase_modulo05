const { Pool } = require("pg")

// Utilizando o Pool não é preciso ficar passando usuario e senha, ele mantem os dados reservados

module.exports = new Pool({
    user: "postgres",
    password: "admin",
    host: "localhost",
    port: "5432",
    database: "my_teacher"
})