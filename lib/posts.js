Posts = new Mongo.Collection('posts');

Posts.allow({
	'update'(userId, post) { 
		return ownsDocument(userId, post); 
	},
	'remove'(userId, post) { 
		return ownsDocument(userId, post); 
	}
});

Posts.deny({
	//page 139
	'update'(userId, post, fieldNames) {
	// may only edit the following two fields:
		return (_.without(fieldNames, 'url', 'title').length > 0);
	}
	/*
		We’re taking the fieldNames array that contains a list of the fields being modified, and using
		Underscore’s without() Method to return a sub-array containing the fields that are not url or
		title.
	*/
});

Meteor.methods({
	'postInsert'(postAttributes) {

		check(Meteor.userId(), String);
		check(postAttributes, {
			title: String,
			url: String
		});

		let errors = validatePost(postAttributes);
		if (errors.title || errors.url)
			throw new Meteor.Error('invalid-post', "You must set a title and URL for your post");

		let postWithSameLink = Posts.findOne({url: postAttributes.url});
		if(postWithSameLink) {
			return {
				postExists: true,
				_id: postWithSameLink._id
			};
		}

		let user = Meteor.user();
		let post = _.extend(postAttributes, {
			userId: user._id,
			author: user.username,
			submitted: new Date()
		});

		let postId = Posts.insert(post);

		return {
			_id: postId
		};
	}, 
	'postEdit'(postAttributes) {

		check(Meteor.userId(), String);
		check(postAttributes, {
			title: String,
			url: String,
			currentPostId: String
		});

		let errors = validatePost(postAttributes);
		if (errors.title || errors.url)
			throw new Meteor.Error('invalid-post', "You must set a title and URL for your post");

		let postWithSameLink = Posts.findOne({url: postAttributes.url});
		if(postWithSameLink) {
			return {
				postExists: true,
				_id: postWithSameLink._id
			};
		}

		Posts.update(postAttributes.currentPostId, {$set: postAttributes});


	}
});

validatePost = (post) => {
	let errors = {};
	if (!post.title)
		errors.title = "Please fill in a title";
	if (!post.url)
		errors.url = "Please fill in a URL";
	return errors;
};