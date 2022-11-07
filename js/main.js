let todoInput
let errorInfo
let addBtn
let ulList
let newTodo
let popup
let popupInfo
let todoToEdit
let popupInput
let popupAddBtn
let popupCloseBtn

const main = () => {
	prepareDOMElements()
	prepareDOMEvents()
}

const prepareDOMElements = () => {
	todoInput = document.querySelector('.todo-input')
	errorInfo = document.querySelector('.error-info')
	addBtn = document.querySelector('.btn-add')
	ulList = document.querySelector('.todolist ul')

	popup = document.querySelector('.popup')
	popupInfo = document.querySelector('.popup-info')
	popupInput = document.querySelector('.popup-input')
	popupAddBtn = document.querySelector('.accept')
	popupCloseBtn = document.querySelector('.cancel')
	// pobieramy wszystkie elementy
}

const prepareDOMEvents = () => {
	addBtn.addEventListener('click', addNewTodo)
	ulList.addEventListener('click', checkClick)
	popupCloseBtn.addEventListener('click', closePopup)
	popupAddBtn.addEventListener('click', changeTodoText)
    todoInput.addEventListener('keyup', enterKeyCheck)
}

// funkcja musi:
//  1. utworzyć nowy element li
//  2. dodawać nowu element li do ul listy
//  3. funkcja odpalana na click w przycisku add
//  4. przechwycić treść inputa i umieszcza go w nowo utrw. elemecie li
//  5. funkcja nie doda do listy pustego 'todosa

const addNewTodo = () => {
	if (todoInput.value !== '') {
		newTodo = document.createElement('li')
		newTodo.textContent = todoInput.value

		createToolsArea()
		ulList.append(newTodo)
		todoInput.value = ''
		errorInfo.textContent = ''
	} else {
		errorInfo.textContent = 'Wpisz treść zadania'
	}
}

const createToolsArea = () => {
	const divTools = document.createElement('div')
	divTools.classList.add('tools')
	newTodo.append(divTools)

	const btnCheck = document.createElement('button')
	btnCheck.classList.add('complete')
	btnCheck.innerHTML = '<i class="fas fa-check"></i>'

	const btnEdit = document.createElement('button')
	btnEdit.classList.add('edit')
	btnEdit.textContent = 'EDIT'

	const btnDelete = document.createElement('button')
	btnDelete.classList.add('delete')
	btnDelete.innerHTML = '<i class="fas fa-times"></i>'

	divTools.append(btnCheck, btnEdit, btnDelete)
}

const checkClick = e => {
	if (e.target.matches('.complete')) {
		e.target.closest('li').classList.toggle('completed')
		e.target.classList.toggle('completed')
	} else if (e.target.matches('.edit')) {
		editTodo(e)
	} else if (e.target.matches('.delete')) {
		deleteTodo(e)
	}
}

const editTodo = e => {
	todoToEdit = e.target.closest('li')

	popupInput.value = todoToEdit.firstChild.textContent
	popup.style.display = 'flex'
}
const closePopup = () => {
	popup.style.display = 'none'
	popupInfo.textContent = ''
}

const changeTodoText = () => {
	if (popupInput.value !== '') {
		todoToEdit.firstChild.textContent = popupInput.value
		popup.style.display = 'none'
		popupInfo.textContent = ''
	} else {
		popupInfo.textContent = 'Musisz podać jakąś treść!'
	}
}

const deleteTodo = e => {
	e.target.closest('li').remove()
	const allTodos = document.querySelectorAll('li')
	if (allTodos.length === 0) {
		errorInfo.textContent = 'Brak zadań na liście'
	}
}

const enterKeyCheck = e => {
    if(e.key==='Enter') {
        
        addNewTodo()
    }
}


document.addEventListener('DOMContentLoaded', main)
