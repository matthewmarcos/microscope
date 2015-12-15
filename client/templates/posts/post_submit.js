Template.postSubmit.created = function() {
	Session.set('postSubmitErrors', {});
};

Template.postSubmit.helpers ({
	errorMessage: function(field) {
		return Session.get('postSubmitErrors')[field];
	},
	errorClass: function (field) {
		return !!Session.get('postSubmitErrors')[field] ? 'has-error' : '';
	}
});

Template.postSubmit.events({
	'submit form': function(e) {
		e.preventDefault(); //stops the action of the event from happening
		var post = {
			url: $(e.target).find('[name=url]').val(),
			title: $(e.target).find('[name=title]').val()
		};
		
		// Only when insecure package is installed (Allows posts from client)

		var errors = validatePost(post);
		if (errors.title || errors.url)
			return Session.set('postSubmitErrors', errors);

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

