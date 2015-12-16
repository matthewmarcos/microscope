Template.postItem.helpers({
	ownPost: function() {
		return this.userId === Meteor.userId();
	},
	domain: function() {
		var a = document.createElement('a');
		a.href = this.url;
		// this refers to object being iterated on
		return a.hostname;
	},
	commentsCount: function() {
		return Comments.find({postId: this._id}).count();
	},
	alreadyInPage: function() {
		// console.log(Router.current().route.path(this));
		// console.log('/posts/' + this._id);
		return !(Router.current().route.path(this) === '/posts/' + this._id);
	}
});