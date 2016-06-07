import Ember from 'ember';

export function returnPrevTodoItem(params/*, hash*/) {
  let index = params[0] - 1;
  let todoList = params[1];

  let prevTodo = todoList[index];

  // console.log("returnPrevTodoItem called " + index + prevTodo);

  return prevTodo;
}

export default Ember.Helper.helper(returnPrevTodoItem);
