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
				//Get the models
				let todoList = this.get('todos');

				//Add a new child to the todoModel
				var newTodoList = 
					[...todoList, 
						{
							text:newTodo, 
							children: []
						}
					];
				
				//Assign the new values
				this.set('todos', newTodoList);

				//Rerender the view
				this.rerender();
			}

			//Clear the newTodo value
			this.set('newTodo', "");
		}
	}
});
