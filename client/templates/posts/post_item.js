Template.postItem.helpers({
	domain: function() {
		var a = document.createElement('a');
		a.href = this.url;
		// this refers to object being iterated on
		return a.hostname;
	}
});