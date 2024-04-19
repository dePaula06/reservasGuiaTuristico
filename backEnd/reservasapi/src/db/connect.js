const mysql = require('mysql2')


const pool = mysql.createPool({
    connectionLimit:10,
    host: 'localhost', // Mude para seu host
    user: 'pedro', // Mude para seu user
    password: '1234', // Mude para sua senha
    database: 'reservaguiaturistico' // Mude para sua tabela
})

module.exports = pool