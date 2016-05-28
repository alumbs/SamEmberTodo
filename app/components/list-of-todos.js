import Ember from 'ember';

function stringNullOrEmpty(str) {
	return (!str || 0 === str.length || !str.trim());
}

export default Ember.Component.extend({
	newTodo: "",
	actions: {
		addNewTodo() {
			let newTodo = this.get('newTodo');

			if(!stringNullOrEmpty(newTodo))
			{
				let todoList = this.get('todos');
				todoList.push(this.newTodo);
				this.rerender();
			}

			this.set('newTodo', "");
		}
	}
});
