const model = {
	//Массив с заметками
	notes: [],
	addColorTitle(color){

	},

	//Добавление note
	addNotes(name, description, color) {
		const id = Math.random()
		const newNote = {id, name, description}
		this.notes.unshift(newNote)
		console.log(this.notes.length)
		view.renderNotes(model.notes);
	},
	// Удаление note
	deleteNote(idNote){
		// если note.id === idNote, то в новый массив эта note добавлена не будет
		this.notes = this.notes.filter(note => note.id !== idNote)
		view.renderNotes(this.notes)
	},
	favNote(favBtn){
		// добавляем нашей кнопке избранное класс favourite при помощи toggle
		const isFav = favBtn.classList.toggle('favourite');
		const img = favBtn.querySelector('.img-icons');
		if (isFav) {
			img.src = 'images/heart_active.svg';
		} else {
			img.src = 'images/heart_inactive.svg';
		}
	}

}


const view = {
	init() {
		this.renderNotes(model.notes);

		const inputName = document.querySelector('#name-notes')
		const inputValue = document.querySelector('#description-notes')

		const notesColor = document.querySelector('.notes-color')
		const addButton = document.querySelector('.add-button')

		const notesBlock = document.querySelector('.notes-block')


		notesColor.addEventListener('click', (event) => {
			const color = event.target.closest('.border-img').id
			controller.addColorTitle(color)
		})

		//Передаем по клику на кнопку содержимое обоих инпутов
		addButton.addEventListener('click', () => {
			const name = inputName.value
			const description = inputValue.value
			controller.addNotes(name, description)
			inputName.value = ''
			inputValue.value = ''
		})

		// слушатель на иконки в note
		notesBlock.addEventListener('click', (event) => {
			// при помощи closest мы находим самый близкий подходящий элемент
			const delBtn = event.target.closest('.del-button');
			const favBtn = event.target.closest('.fav-button');
			// клик на кнопку удаления
			if (delBtn) {
				const note = delBtn.closest('.note');
				return controller.deleteNote(+note.id)
			}// клик на кнопку избранное
			if (favBtn) {
				return controller.favNote(favBtn)
			}

		})

	}, renderNotes(notes) {
		const notesBlock = document.querySelector('.notes-block')
		let notesHTML = ''

		for (const note of notes) {
			notesHTML += `
<!--		создаем note-->
        <div id="${note.id}" class="note">
<!--        титульник note-->
          <div class="note-title">${note.name} 
<!--          блок иконок удаление и избранное-->
          <div class="icons">
          <button class="fav-button" type="button">
          <img class="img-icons" src="images/heart_inactive.svg" alt="heart_inactive">
          </button> 
          <button class="del-button" type="button">
          <img class="img-icons" src="images/trash.svg" alt="trash"></button> 
          </div>
<!--         блок с текстом-->
          </div>
          <p class="note-description">${note.description}</p>
         
        </div>
      `
		}
		notesBlock.innerHTML = notesHTML
	},


}

const controller = {
	addColorTitle(color){
		model.addColorTitle(color)
	},

	addNotes(name, description) {
		//Проверка на пустую строку
		if (name.trim() !== '' && description.trim() !== '') {
			// Проверка на длину строки
			if (name.trim().length <= 50 && description.trim().length <= 200) {
				//Передаем содержимое обоих инпутов в model
				model.addNotes(name, description)
			} else {
				console.log('Превышен лимит символов')
			}
		} else {
			console.log('в контроллер ничего не передалось')
		}

	},
	//id переданное из view для удаления note
	deleteNote(idNote) {
			return model.deleteNote(idNote)
	},
	favNote(favBtn){
		return model.favNote(favBtn)
	}

}

function init() {
	view.init()
}

init()