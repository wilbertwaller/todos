import Todo from './todo.js'

export default class Todos {
    constructor() {
        this.todos = []
    }

    getTodos() {
        return this.todos
    }

    add(todo) {
        this.todos.push(todo)
    }

    remove(id) {
        this.todos = this.todos.filter(function(todo) { return todo.id !== id })
    }

    load() {
        if (localStorage.getItem("todos")) {
            const data = JSON.parse(localStorage.getItem("todos"))
            this.todos = data.map(function(todo) { return new Todo(todo) })
        }
    }

    save() {
        localStorage.setItem("todos", JSON.stringify(this.todos))
    }
}