export default class Todo {
    constructor({ todo, id = Date.now(), isDone = false } = todo || {}) {
        this.todo = todo
        this.id = id
        this.isDone = isDone
    }

    isDone() {
        return this.isDone
    }

    toggleDone() {
        this.isDone = !this.isDone
    }
}