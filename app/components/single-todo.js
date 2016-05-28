import Ember from 'ember';

export default Ember.Component.extend({
	isTodoCompleted: false,
	todoStyle: "none",
	actions: {
		toggleTodoCompleted() {
			let todoIsCompleted = this.get('isTodoCompleted');
			todoIsCompleted = !todoIsCompleted;
			this.set('isTodoCompleted', todoIsCompleted);
			this.set('todoStyle', todoIsCompleted ? "line-through": "none");
		}
	}
});
