const model = {
	//Массив с заметками
	notes: [],

	//Добавление note
	addNotes(name, description, color) {
		const id = Math.random()
		const newNote = {id, name, description,color,isFavourite: false}
		this.notes.unshift(newNote)
		view.renderNotes(model.notes);
	},
	// Удаление note
	deleteNote(idNote){
		// если note.id === idNote, то в новый массив эта note добавлена не будет
		this.notes = this.notes.filter(note => note.id !== idNote)
		view.renderNotes(this.notes)
	},
	// изменение статуса isFavourite
	favNote(idNote) {
		const note = this.notes.find(n => n.id === idNote);
		if (note) {
			note.isFavourite = !note.isFavourite;
			view.renderNotes(this.notes)
		}
	},

	favList(isChecked){
		if (isChecked === true) {
			const filteredNotes = this.notes.filter(note => note.isFavourite);
			view.renderNotes(filteredNotes);

		} else if (isChecked === false) {
			view.renderNotes(this.notes);
		}
	}

}


const view = {
	notesBlock : document.querySelector('.notes-block'),
	init() {
		this.renderNotes(model.notes);

		const inputName = document.querySelector('#name-notes')
		const inputValue = document.querySelector('#description-notes')


		const addButton = document.querySelector('.add-button')

		const favCheck = document.querySelector('.fav-notes');





		//Передаем по клику на кнопку содержимое обоих инпутов
		addButton.addEventListener('click', () => {
			// выбор цвета для тайтла
			const selectedRadio = document.querySelector('input[name="color"]:checked');
			const color = selectedRadio.value


			const name = inputName.value
			const description = inputValue.value

			controller.addNotes(name, description, color)

		})

		favCheck.addEventListener('change', (event) => {

			const favIcon = document.querySelector('.status-icon');
			const isChecked = event.target.checked;
			favIcon.src = isChecked ? 'images/checkbox_active.svg' : 'images/checkbox_inactive.svg';

			// console.log(isChecked)
			controller.favList(isChecked);
		})



		// слушатель на иконки в note
		this.notesBlock.addEventListener('click', (event) => {
			// при помощи closest мы находим самый близкий подходящий элемент
			const delBtn = event.target.closest('.del-button');
			const favBtn = event.target.closest('.fav-button');
			const note = event.target.closest('.note');
			// клик на кнопку удаления
			if (delBtn) {
				return controller.deleteNote(+note.id)
			}// клик на кнопку избранное
			if (favBtn) {
				return controller.favNote(+note.id)
			}
		})

	}, renderNotes(notes) {

		//блок добавления счетчика заметок
		const counterElement = document.querySelector('.notes-count');
		if (counterElement) {
			counterElement.textContent = `Всего заметок: ${notes.length}`;
		}

		//блок добавления note
		let notesHTML = ''

		for (const note of notes) {
			const favClass = note.isFavourite ? 'favourite' : '';
			const favIcon = note.isFavourite ? 'images/heart_active.svg' : 'images/heart_inactive.svg';
			notesHTML += `
<!--		создаем note-->
        <div id="${note.id}" class="note ${favClass}">
<!--        титульник note-->
<!-- цвет передается по клику на радиокнопку и берется его value-->
          <div class="note-title" style="background-color: ${note.color};">${note.name} 
<!--          блок иконок удаление и избранное-->
          <div class="icons">
          <button class="fav-button" type="button" style="background-color: ${note.color};">
          <img class="img-icons" src="${favIcon}" alt="heart_inactive">
          </button> 
          <button class="del-button" type="button" style="background-color: ${note.color};">
          <img class="img-icons" src="images/trash.svg" alt="trash"></button> 
          </div>
<!--         блок с текстом-->
          </div>
          <p class="note-description">${note.description}</p>
         
        </div>
      `
		}
		this.notesBlock.innerHTML = notesHTML
	},
	displayMessage(imageSrc) {
		const messageBox = document.querySelector('.message-box')
		const messageIcon = messageBox.querySelector('.message-icon');
		messageIcon.src = imageSrc;
		messageBox.classList.remove('hidden');
		setTimeout(() => {
			messageBox.classList.add('hidden');
		}, 3000);
}


}

const controller = {

	addNotes(name, description, color) {
		const inputName = document.querySelector('#name-notes')
		const inputValue = document.querySelector('#description-notes')
		//Проверка на пустую строку
		if (name.trim() !== '' && description.trim() !== '') {
			// Проверка на длину строки
			if (name.trim().length <= 50 && description.trim().length <= 1000) {
				const iconPath = `images/done.svg`;
				// если все проверки прошли, то поле инпутов зачищается, в противном случаю все остается
				inputName.value = ''
				inputValue.value = ''
				//Передаем содержимое обоих инпутов в model
				model.addNotes(name, description,color)
				view.displayMessage(iconPath)
			} else {
				const iconPath = `images/error.svg`;
				view.displayMessage(iconPath)
			}
		} else {
			console.log('в контроллер ничего не передалось')
		}

	},
	//id переданное из view для удаления note
	deleteNote(idNote) {
			return model.deleteNote(idNote)
	},
	//id переданное из view для добавления статуса isFavourite для note
	favNote(idNote){
		return model.favNote(idNote)
	},

	favList(isChecked){
		// console.log(isChecked)
		return model.favList(isChecked)
}

}

function init() {
	view.init()
}

init()