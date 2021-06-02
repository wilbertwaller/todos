import Todo from "./todo.js"
import Todos from "./todos.js"

(function() {
    const todos = new Todos()
    
    function init() {
        const form = document.querySelector("form")
        const clear = document.querySelector("#clear")
        form.addEventListener("submit", handleSubmit)
        clear.addEventListener("click", clearCompletedTodos)

        load()
        updateStats()
    }

    function handleSubmit(e) {
        e.preventDefault()

        const input = document.querySelector("input")
        const value = input.value.trim()
        if (value) {
            const todo = new Todo({ todo: value })
            todos.add(todo)
            todos.save()
            addTodoToDOM(todo)
            updateStats()
        }

        input.value = ""
    }

    function clearCompletedTodos() {
        const completed = todos.getTodos().filter(function(todo) { return todo.isDone })
        completed.forEach(function(todo) { 
            todos.remove(todo.id)
            removeTodoFromDOM(todo.id)
        })
        todos.save()
        updateStats()
    }

    function removeTodoFromDOM(id) {
        const todoCheckbox = document.getElementById(id)
        const listItem = todoCheckbox.closest("li")
        listItem.remove()
    }

    function addTodoToDOM(todo) {
        const item = document.createElement("li")
        item.appendChild(createCheckbox(todo))
        document.getElementById("todos").appendChild(item)
    }

    function createCheckbox(todo) {
        const div = document.createElement("div")
        const checkbox = document.createElement("input")
        const label = document.createElement("label")

        checkbox.type = "checkbox"
        checkbox.id = todo.id
        checkbox.checked = todo.isDone
        checkbox.className = "todo-item"
        checkbox.addEventListener("change", function() {
            todo.toggleDone()
            if (todo.isDone) div.classList.add("done")
            else div.classList.remove("done")
            todos.save()
            updateStats()
        })
        label.htmlFor = todo.id
        label.innerText = todo.todo

        if (todo.isDone) div.classList.add("done")
        div.appendChild(checkbox)
        div.appendChild(label)
        return div
    }

    function load() {
        todos.load()
        todos.getTodos().forEach(function(todo) { addTodoToDOM(todo) })
    }

    function updateStats() {
        const complete = todos.getTodos().filter(function(todo) { return todo.isDone }).length
        const total = todos.getTodos().length
        document.getElementById("complete").innerText = complete
        document.getElementById("total").innerText = total
    }

    init()
})()