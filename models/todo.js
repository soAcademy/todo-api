const sqlite3 = require('sqlite3')
const db = new sqlite3.Database(':memory:')

db.serialize(() => {
    const sql = 'CREATE TABLE IF NOT EXISTS todos (id integer primary key, text, isComplete BOOL)'
    db.run(sql)
    db.run('INSERT INTO todos(text, isComplete) VALUES(?, ?)', 'buy milk', false)
    db.run('INSERT INTO todos(text, isComplete) VALUES(?, ?)', 'rent the car', false)
    db.run('INSERT INTO todos(text, isComplete) VALUES(?, ?)', 'feed a dog', false)
})

class Todo {
    constructor(id, text) {
        this.id = id
        this.text = text
    }

    static all(callback) {
        db.all('SELECT * FROM todos', callback)
    }

    static getId(id, callback) {
        const sql = 'SELECT * FROM todos WHERE id = ?'
        db.all(sql, id, callback)
    }

    static add(todo) {
        const sql = 'INSERT INTO todos(text, isComplete) VALUES(?, ?)'
        db.run(sql, todo.text, false)
    }

    static update(todo, callback) {
        const sql = 'UPDATE todos SET text = ?, isComplete = ? WHERE id = ?'
        db.run(sql, todo.text, todo.isComplete, todo.id, callback)
    }

    static delete(id, callback) {
        const sql = 'DELETE FROM todos WHERE id = ?'
        db.run(sql, id, callback)
    }
}

module.exports = Todo;
