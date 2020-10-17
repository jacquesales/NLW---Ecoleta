const sqlite3 = require("sqlite3").verbose()

const db = new sqlite3.Database("./src/database/database.db")

module.exports = db

/* db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            name TEXT,
            address TEXT,
            address2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT
        );    
    `)     
    const query = `
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);
    `
    const values = [
        "https://images.pexels.com/photos/159751/book-address-book-learning-learn-159751.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        "Papersider",
        "Guilherme Gemballa, Jardim América",
        "Nº 260",
        "Santa Catarina",
        "Rio do Sul",
        "Papéis e Papelão"
    ]

    function afterInsertData(err) {
        if(err) {
            return console.log(err)
        }
        console.log('Cadastrado com sucesso')
        console.log(this)
    }

    db.run(query, values, afterInsertData) // incluir dados

    /* db.all(`SELECT * FROM places`, function(err, rows) { //consultar dados
        if(err) {
            return console.log(err)
        }
        console.log('Aqui estão os seus registros')
        console.log(rows)
    }) */

    /* db.run(`DELETE FROM places WHERE id = ?`, [1], function(err) { // deletar dados
        if(err) {
            return console.log(err)
        }
        console.log('Registro deletado com sucesso')

    }) 

}) */