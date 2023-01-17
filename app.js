const express = require('express')
const cors = require('cors')
const port = 9000
const app = express()
const bodyParser = require('body-parser')
const Todo = require('./models/todo')

app.use(cors())
app.use(bodyParser.json())

app.get('/', function(request, response) {
    Todo.all((err, todos) => {
        if(err) {
            response.status(500, 'Internal Server Error').send()
            return
        }
        let formattedTodo = todos.map((todo) => ({
            ...todo,
            isComplete: todo.isComplete == 0 ? false : true
        }))
        response.status(200).json(formattedTodo)
    })
})

app.post('/', (request, response) => {
    const newTodo = request.body
    Todo.add(newTodo)
    response.status(201).json()
})

app.put('/:id', (request, response) => {
    const id = request.params.id
    const updatedTodo = request.body
    updatedTodo.id = parseInt(id)
    Todo.update(updatedTodo, (err, data) => {
        if(err) {
            response.status(404, 'The task is not found').send()
            return
        }
        response.status(200).send(data);
    })
})

app.patch('/:id', (request, response) => {
    const id = request.params.id

    Todo.getId(id, (err, todos) => {
        let todo = todos[0]
        if(err || !todo) {
            response.status(404, 'The task is not found').send();
            return
        }
        const updatedTodo = {
            ...todo,
            ...request.body
        }
        Todo.update(updatedTodo, (err, data) => {
            if(err) {
              response.status(404, 'The task is not found').send()
              return
            }
            response.status(200).send(data);
        })
    })
})

app.delete('/:id', (request, response) => {
    const id = parseInt(request.params.id);
    Todo.delete(id, (err) => {
        if(err) {
            response.status(404).send()
            return
        }
        response.status(200).send()
    })
})

app.listen(port)
