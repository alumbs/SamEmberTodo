import Ember from 'ember';

const enterKeyIntegerValue = 13;

function stringNullOrEmpty(str) {
	return (!str || 0 === str.length || !str.trim());
}

function toggleValue(currentVal, toggleValue1, toggleValue2){
	let newToggleVal = currentVal;

	if(!stringNullOrEmpty(currentVal)){
		if(currentVal === toggleValue1){
			newToggleVal = toggleValue2;
		}
		else
		{
			newToggleVal = toggleValue1;
		}
	}

	return newToggleVal;
}

function createNewTodoModelWithText(modelText){
	return {text:modelText, children: []};
}

export default Ember.Component.extend({
	isTodoCompleted: false,
	todoStyle: "none",
	newChildTodo: "",
	todoItemMinimized: "block",
	minimizeTodoValue: "-",
	isTodoBeingEdited: false,

	toggleTodoCompleted: function() {
		// console.log("toggleTodoCompleted called");
		let todoIsCompleted = this.get('isTodoCompleted');
		// todoIsCompleted = !todoIsCompleted;
		// this.set('isTodoCompleted', todoIsCompleted);
		this.set('todoStyle', todoIsCompleted ? "line-through": "none");
	}.observes('isTodoCompleted'),

	EnterkeyPressed: function(e) {
		// Add a new child todo when the enter button is
		//pressed
		if (e.which === enterKeyIntegerValue) {
      return true;
      // this.send('addNewChildTodo');
    }

    return false;
	},
	actions: {
		addNewSiblingTodo(e) {
			// console.log("addNewSiblingTodo called " + e);

			if(this.EnterkeyPressed(e)){
				// console.log("Enter key pressed");

				//Get the models
				let todoList = this.get('todoListModel');

				//Add a new child to the todoModel
				var newTodoList = 
					[...todoList, 
						{
							text:"", 
							children: []
						}
					];
				
				//Assign the new values
				this.set('todoListModel', newTodoList);

				//Rerender the view
				this.rerender();	
			}				
		},
		isTodoInEditMode(todoInEditMode) {
			this.set("isTodoBeingEdited", todoInEditMode);
		},
		todoDoneEditing(newTodoTextValue){
			//set the new todo text value
			this.set("todoModel.text", newTodoTextValue);

			//make sure everyone knows the todo is
			//done being edited
			this.send('isTodoInEditMode', false);
		},
		// toggleTodoCompleted() {
		// 	let todoIsCompleted = this.get('isTodoCompleted');
		// 	todoIsCompleted = !todoIsCompleted;
		// 	this.set('isTodoCompleted', todoIsCompleted);
		// 	this.set('todoStyle', todoIsCompleted ? "line-through": "none");
		// },
		addNewChildTodo() {
			//Get the models
			let newChildTodo = this.get('newChildTodo');

			if(!stringNullOrEmpty(newChildTodo))
			{
				//Get the models
				let newTodoModel = this.get('todoModel');

				//Add a new child to the todoModel
				var newChildTodoModel = createNewTodoModelWithText(newChildTodo);
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
		},
		minimizeTodo() {
			//get the 'todoItemMinimized' model
			let isTodoMinimized = this.get("todoItemMinimized");
			let minimizeTodoValue = this.get("minimizeTodoValue");

			this.set("minimizeTodoValue", 
				toggleValue(minimizeTodoValue, "+", "-"));

			this.set("todoItemMinimized", 
				toggleValue(isTodoMinimized, "block", "none"));
		}
	}
});
