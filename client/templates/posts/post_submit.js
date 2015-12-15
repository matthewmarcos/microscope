Template.postSubmit.helpers ({});

Template.postSubmit.events({
	'submit form': function(e) {
		e.preventDefault(); //stops the action of the event from happening
		var post = {
			url: $(e.target).find('[name=url]').val(),
			title: $(e.target).find('[name=title]').val()
		};
		

		// Only when insecure package is installed (Allows posts from client)
		// post._id = Posts.insert(post);

		Meteor.call('postInsert', post, function(err, res) {
			if(err) {
				throwError(err.reason);
			} else if(res.postExists) {
				// alert('This link has already been posted!');
				throwError('A post with this link already exists!');
			} else {
				Router.go('postPage', {_id: res._id}); //constructs URL for us to go to.				
			}

		});

	}
});