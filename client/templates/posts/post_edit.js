Template.postEdit.events({
	'submit form': function(e) {
		e.preventDefault();
		var currentPostId = this._id;
		var postProperties = {
			url: $(e.target).find('[name=url]').val(),
			title: $(e.target).find('[name=title]').val()
		}

		Meteor.call('postEdrit', postProperties, function (err, res) {
			if(err) {
				return throwError(err.reason);
			} else if(res.postExists) {
				// alert('A post with this link already exists!');
				throwError('A post with this link already exists!');
			} else {
				Router.go('postPage', {_id: res._id}); //constructs URL for us to go to.
			}

		});
		// Posts.update(currentPostId, {$set: postProperties}, function(error) {
		// 	if (error) {
		// 	// display the error to the user
		// 		alert(error.reason);
		// 	} else {
		// 		Router.go('postPage', {_id: currentPostId});
		// 	}
		// });
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