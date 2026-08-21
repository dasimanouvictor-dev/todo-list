export function createElement(tagName, attribut={}) {
    const element = document.createElement(tagName)
    
    for (const [name, value] of Object.entries(attribut)) {
        if(value !== false || value !== null) {
            element.setAttribute(name,value)
        }
    }

    return element
}