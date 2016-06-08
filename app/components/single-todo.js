import Ember from 'ember';

const enterKeyIntegerValue = 13;
const tabKeyIntegerValue = 9;

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
	deleteTodoFromList(todoList, todo) {
		//remove the model from the parent object
		if(todoList && todo)
		{
			todoList.removeObject(todo);
		}
	},

	tryMakeCurrentTodoASibling(){
		//Get the todoListModel
		var todoList = this.get('todoListModel');

		//get the current todo
		let currentTodoModel = this.get('todoModel');

		//get parent todoList
		let parentTodoList = this.get('parentTodoList');

		if(parentTodoList)
		{
			//delete the currentTodoModel from its todoList
			this.deleteTodoFromList(todoList, currentTodoModel);

			let newParentTodoList = [...parentTodoList, currentTodoModel];
				
			//set the parent todoList's children
			this.set('parentTodoList', newParentTodoList);

			this.rerender();
		}
	},
	tryMakeCurrentTodoAChild() {
		//Get the todoListModel
		var todoList = this.get('todoListModel');

		//get the current todo
		let currentTodoModel = this.get('todoModel');

		//get previous todo to ours
		let prevTodo = this.get('previousTodo');

		//If the previous todo item exists
		//make the current todo item its child
		if(prevTodo)
		{
			let newPreviousTodoChildren = [...prevTodo.children, currentTodoModel];

			//remove the model from the parent object
			// todoList.removeObject(currentTodoModel);
			this.deleteTodoFromList(todoList, currentTodoModel);

			//set the previous todo's children
			this.set('previousTodo.children', newPreviousTodoChildren);

			this.set('todoListModel', todoList);

			this.rerender();
		}
	},
	addNewSiblingTodo: function() {
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
	},

	toggleTodoCompleted: function() {
		// console.log("toggleTodoCompleted called");
		let todoIsCompleted = this.get('isTodoCompleted');
		// todoIsCompleted = !todoIsCompleted;
		// this.set('isTodoCompleted', todoIsCompleted);
		this.set('todoStyle', todoIsCompleted ? "line-through": "none");
	}.observes('isTodoCompleted'),

	TabKeyPressed: function(e){
		// Add a new child todo when the tab button is
		//pressed
		if (e.which === tabKeyIntegerValue) {
      return true;
    }

    return false;
	},

	ShiftTabKeyPressed: function(e){
		if(e.shiftKey && this.TabKeyPressed(e)){
			return true;
		}
		return false;
	},

	EnterkeyPressed: function(e) {
		// Add a new child todo when the enter button is
		//pressed
		if (e.which === enterKeyIntegerValue) {
      return true;
    }

    return false;
	},
	actions: {
		handleKeyPress(e) {
			// console.log("key pressed");

			if(this.EnterkeyPressed(e)){
				// console.log("Enter key pressed");

				this.addNewSiblingTodo();	
			}			
			else if(this.ShiftTabKeyPressed(e)){
				// console.log("Shift+Tab key pressed");
				this.tryMakeCurrentTodoASibling();
			}
			else if(this.TabKeyPressed(e)){
				//Make the current todo element the child element
				// console.log("Tab key pressed");

				this.tryMakeCurrentTodoAChild();
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
			// todoList.removeObject(todo);
			this.deleteTodoFromList(todoList, todo);

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
