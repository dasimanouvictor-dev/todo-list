import { TodoList } from "./component/todo.js"

try {

    const myTodoList = new TodoList()
    myTodoList.appendTo(document.querySelector('.main'))

} catch(e) {
    console.log(e.message,e)
}