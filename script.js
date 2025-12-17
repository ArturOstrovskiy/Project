const model = {
	//Массив с заметками
	notes: [],
	addNotes(name, value){
		console.log(name, value)
		const id = Math.random()
		const newNote = { id, name, value }
		this.notes.push(newNote)
		console.log(this.notes.length)
		view.renderNotes(model.notes);
	}

}


const view = {
	init() {
		this.renderNotes(model.notes);

		const inputName = document.querySelector('#name-notes')
		const inputValue = document.querySelector('#value-notes')
		const addButton = document.querySelector('.add-button')

		//Передаем по клику на кнопку содержимое обоих инпутов
		addButton.addEventListener('click', () => {
			const name = inputName.value
			const value = inputValue.value
			controller.addNotes(name,value)
			inputName.value = ''
			inputValue.value = ''
		})
	},
	renderNotes(notes) {
		const notesBlock = document.querySelector('.notes-block')
		let notesHTML = ''

		for (const note of notes) {
			notesHTML += `
        <div id="${note.id}" class="movie">
          <b class="note-title">${note.name}</b>
          <p class="note-description">${note.value}</p>
          <button class="delete-button" type="button">Удалить 🗑</button>
        </div>
      `
		}
		notesBlock.innerHTML = notesHTML
	},


}

const controller = {
	addNotes(name,value){
		//Проверка на пустую строку
		if (name.trim() !== '' && value.trim() !== '') {
			//Передаем содержимое обоих инпутов в model
			model.addNotes(name, value)
		} else {
			console.log('в контроллер ничего не передалось')
		}
	}
}

function init(){
	view.init()
}

init()