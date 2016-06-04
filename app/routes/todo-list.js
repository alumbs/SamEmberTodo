import Ember from 'ember';

var todoList = [
	
];

export default Ember.Route.extend({
	model() {
		return todoList;
	}
});
