import Ember from 'ember';

var todoList = ['Sample Todo 1','Sample Todo 2','Sample Todo 3'];

export default Ember.Route.extend({
	model() {
		return todoList;
	}
});
