Template.postEdit.created = function() {
	Session.set('postEditErrors', {});
};

Template.postEdit.helpers({
	errorMessage: function(field) {
		return Session.get('postEditErrors')[field];
	},
	errorClass: function (field) {
		return !!Session.get('postEditErrors')[field] ? 'has-error' : '';
	}
})

Template.postEdit.events({
	'submit form': function(e) {
		e.preventDefault();
		var currentPostId = this._id;
		var postProperties = {
			url: $(e.target).find('[name=url]').val(),
			title: $(e.target).find('[name=title]').val()
		}

		var errors = validatePost(postProperties);
		if (errors.title || errors.url)
			return Session.set('postEditErrors', errors);

		Meteor.call('postEdit', postProperties, function (err, res) {
			if(err) {
				return throwError(err.reason);
			} else if(res.postExists) {
				// alert('A post with this link already exists!');
				throwError('A post with this link already exists!');
			} else {
				Router.go('postPage', {_id: res._id}); //constructs URL for us to go to.
			}

		});
	},
	'click .delete': function(e) {
		e.preventDefault();
		if (confirm("Delete this post?")) {
			var currentPostId = this._id;
			Posts.remove(currentPostId);
			Router.go('postsList');
		}
	}
});