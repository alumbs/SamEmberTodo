import Ember from 'ember';

export default Ember.Component.extend({
	isTodoCompleted: false,
	todoStyle: "none",
	newChildTodo: "",
	actions: {
		toggleTodoCompleted() {
			let todoIsCompleted = this.get('isTodoCompleted');
			todoIsCompleted = !todoIsCompleted;
			this.set('isTodoCompleted', todoIsCompleted);
			this.set('todoStyle', todoIsCompleted ? "line-through": "none");
		},
		addNewChildTodo() {
			//Get the models
			let newChildTodo = this.get('newChildTodo');
			let newTodoModel = this.get('todoModel');

			//Add a new child to the todoModel
			var todoChildren = [...newTodoModel.children, newChildTodo];
			
			//Assign the new values
			this.set('todoModel.children', todoChildren);

			//Clear the newTodo value
			this.set('newChildTodo', "");
			
			//Rerender the view
			this.rerender();
		}
	}
});
