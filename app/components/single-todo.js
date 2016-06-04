import Ember from 'ember';

const enterKeyIntegerValue = 13;

function stringNullOrEmpty(str) {
	return (!str || 0 === str.length || !str.trim());
}

export default Ember.Component.extend({
	isTodoCompleted: false,
	todoStyle: "none",
	newChildTodo: "",
	keyPress: function(e) {
		// Add a new child todo when the enter button is
		//pressed
		if (e.which === enterKeyIntegerValue) {
      this.send('addNewChildTodo');
    }
	},
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

			if(!stringNullOrEmpty(newChildTodo))
			{
				//Get the models
				let newTodoModel = this.get('todoModel');

				//Add a new child to the todoModel
				var newChildTodoModel = {text:newChildTodo, children: []};
				var todoChildren = [...newTodoModel.children, newChildTodoModel];
				
				//Assign the new values
				this.set('todoModel.children', todoChildren);
				
				//Rerender the view
				this.rerender();
			}		

			//Clear the newTodo value
			this.set('newChildTodo', "");	
		},
		deleteTodo(todoList, todo) {
			//remove the model from the parent object
			todoList.removeObject(todo);

			//Rerender the view
			this.rerender();
		}
	}
});
