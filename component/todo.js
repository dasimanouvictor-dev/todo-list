import { createElement } from "../function/dom.js"

/**
 * @typedef {object} Todo
 * @param {number} id
 * @param {string} title
 */
export class TodoList {
    #todos = []
    #ListElement

    /**
     * @param {Todo[]} todo 
     */
    constructor(/*todos*/) {
        // this.#todos = todos
    }
    
    appendTo(element) {

        element.innerHTML=`            
            <form>
                <input required="" type="text" class="formStyle" id="userInput" name="userInput" value="" placeholder="Entrez une tache a realiser">
                <button class="formStyle" id="addInput">Ajouter</button>
            </form>
            <div class="listButton">
                <button type="button" class="manipulatiionButon active">Toutes</button>
                <button type="button" class="manipulatiionButon">À faire</button>
                <button type="button" class="manipulatiionButon">Faites</button>
            </div>

            <ul class="listGroup">
            </ul>
        `
        this.#ListElement = element.querySelector('.listGroup')
        for (const todo of this.#todos) {
            const todoItem = new TodoListItem(todo)
            this.#ListElement.append(todoItem.element)
        }

        element.querySelector('form').addEventListener('submit', (formEvent) => this.onSubmit(formEvent))
    }

    onSubmit(formEvent) {
        formEvent.preventDefault()
        const form = formEvent.currentTarget
        const title = new FormData(form).get('userInput').toString().trim()

        if (title === '') {
            return
        } else {
            const todo = {
                id: Date.now(),
                title: title
            }

            const item = new TodoListItem(todo)
            this.#ListElement.append(item.element)
            form.reset()
        }
    }

}

class TodoListItem {

    #element

    /**
     * @param {Todo} todo 
     */
    constructor(todo) {

        const idTodo = `todo${todo.id}`

        const list = createElement('li', {
            class: 'gestionDeList'
        })
        this.#element = list

        const checkbox = createElement('input', {
            type: 'checkbox',
            id: idTodo,
            name: idTodo
        })
        list.append(checkbox)

        const label = createElement('label', {
            for: idTodo
        })
        label.innerText = todo.title
        list.append(label)

        const bouton = createElement('button', {
            type:'button',
            class:'boutonSupprimer'
        })

        const span = createElement('span', {
            class:'material-symbols',
            'data-symbole': 'delete'
        })
        bouton.append(span)
        list.append(bouton)
        bouton.addEventListener('click', (boutonEvent) => this.remove(boutonEvent))
        checkbox.addEventListener('change', (checkboxEvent) => this.toogle(checkboxEvent.currentTarget))
    }

    get element() {
        return this.#element
    }

    remove(boutonEvent) {
        boutonEvent.preventDefault()
        this.#element.remove()
    }

    toogle(checkbox) {
        if(checkbox.checked) {
            this.#element.classList.add('.is-completed')
        } else {
            this.#element.classList.remove('.is-completed')
        }
    }

}