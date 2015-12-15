Template.postEdit.events({
	'submit form': function(e) {
		e.preventDefault();
		var currentPostId = this._id;
		var postProperties = {
			url: $(e.target).find('[name=url]').val(),
			title: $(e.target).find('[name=title]').val()
		}

		Meteor.call('postEdit', postProperties, function (err, res) {
			if(err) {
				return alert(err.reason);
			}

			if(res.postExists) {
				alert('A post with this link has already been posted!');
			}

			Router.go('postPage', {_id: res._id}); //constructs URL for us to go to.
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