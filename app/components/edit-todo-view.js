import Ember from 'ember';

export default Ember.Component.extend({
	didInsertElement: function() {
    this.$('input').focus();
    var self = this;
		this.$('input').keydown(function (event) {
			if (event.which === 9) {
				// [TAB]
				event.preventDefault();
				self.get('target').send('handleKeyPress', event);
			}
		});
  }
});

