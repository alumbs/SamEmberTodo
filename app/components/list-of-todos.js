import Ember from 'ember';

export default Ember.Component.extend({
	newTodo: "",
	actions: {
		addNewTodo() {
			let todoList = this.get('todos');
			console.log(todoList);
			todoList.push(this.newTodo);
			this.set('newTodo', "");
			this.rerender();			
		}
	}
});
