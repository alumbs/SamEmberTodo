import Ember from 'ember';

export default Ember.Component.extend({
	showTodo: false,
	isTodoCompleted: false,
	todoStyle: "none",
	actions: {
		displayTodo() {
			this.set('showTodo', true);
		},
		hideTodo(){
			this.set('showTodo', false);
		},
		toggleTodoCompleted() {
			let todoIsCompleted = this.get('isTodoCompleted');
			// console.log("todoIsCompleted before: " + todoIsCompleted);
			todoIsCompleted = !todoIsCompleted;
			this.set('isTodoCompleted', todoIsCompleted);

			this.set('todoStyle', todoIsCompleted ? "line-through": "none");
			// console.log("todoIsCompleted after: " + todoIsCompleted);
		}
	}
});
