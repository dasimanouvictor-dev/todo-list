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
    constructor(todos) {
        this.#todos = todos
    }
    
    appendTo(element) {

        element.innerHTML=`            
            <form>
                <input type="text" class="formStyle" id="userInput" name="userInput" value="" placeholder="Entrez une tache a realiser">
                <button class="formStyle" id="addInput">Ajouter</button>
            </form>
            <div class="listButton">
                <button type="button" class="manipulatiionButon active">Toutes</button>
                <button type="button" class="manipulatiionButon">À faire</button>
                <button type="button" class="manipulatiionButon">Faites</button>
            </div>

            <ul class="listGroup">
                <li class="gestionDeList">
                    <input type="checkbox" id="tache1" name="tache1">
                    <label for="tache1">Laver mes habits</label>
                    <button type="button"  class=" boutonSupprimer">
                        <span class="material-symbols" data-symbole="delete"></span>
                    </button>
                </li>
                <li class="gestionDeList">
                    <input type="checkbox" id="tache2" name="tache2">
                    <label for="tache2">Faire mes devoirs</label>
                    <button type="button"  class="boutonSupprimer">
                        <span class="material-symbols" data-symbole="delete"></span>
                    </button>
                </li>
            </ul>
        `
        this.#ListElement = element.querySelector('.listGroup')
        for (const todo of this.#todos) {
            const todoItem = new TodoListItem(todo)
            this.#ListElement.append(todo)
        }
    }

}

class TodoListItem {

    #element

    /**
     * @param {Todo} todo 
     */
    constructor(todo) {

        const idTodo = `todo${todo.id}`,

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
            class:'',
            'data-symbole': 'delete'
        })
        bouton.append(span)
        list.append(bouton)
    }

    get element() {
        return this.#element
    }
}