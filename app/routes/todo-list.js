import Ember from 'ember';

var todoList = [
	{text:'Sample Todo 1', children: []},//[{text:'Todo Child 1', children: []}]},
	{text:'Sample Todo 2', children: []},
	{text:'Sample Todo 3', children: []}
];

export default Ember.Route.extend({
	model() {
		return todoList;
	}
});
