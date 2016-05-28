import Ember from 'ember';

function stringNullOrEmpty(str) {
	return (!str || 0 === str.length || !str.trim());
}

const enterKeyIntegerValue = 13;

export default Ember.Component.extend({
	newTodo: "",
	keyPress: function(e) {
		// Add a new todo when the enter button is
		//pressed
		if (e.which === enterKeyIntegerValue) {
      this.send('addNewTodo');
    }
	},
	actions: {
		// keyPress: function(e) {
		// 	console.log('KeyPress gets called');
		// 	if (e.which === 13) {
  //       console.log('Add a new todo');
  //       this.addNewTodo();
  //     }
		// },
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
