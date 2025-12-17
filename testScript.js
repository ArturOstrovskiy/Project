const view = {
	addButton: document.querySelector('.add-button'),
	optionBlock: document.querySelector('.notes-color-block')
	// другие элементы...
};

const controller = {
	init() {
		// Проверяем, что кнопка найдена, прежде чем вешать событие
		if (view.addButton) {
			view.addButton.addEventListener('click', () => {
				this.handleAddNote();
			});
		}
	},
	handleAddNote() {
		console.log("Кнопка нажата, логика добавления работает!");
		console.log(view.optionBlock);
	}
};

controller.init();