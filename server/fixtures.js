// if (Posts.find().count() === 0) {
// 	Posts.insert({
// 		title: 'Introducing Telescope',
// 		url: 'http://sachagreif.com/introducing-telescope/'
// 	});

// 	Posts.insert({
// 		title: 'Meteor',
// 		url: 'http://meteor.com'
// 	});

// 	Posts.insert({
// 		title: 'The Meteor Book',
// 		url: 'http://themeteorbook.com'
// 	});
// }

if(Meteor.users.find({username: 'admin'}).count() === 0) {
	console.log('No admin account found. Creating one now');
	Accounts.createUser({
		username: 'admin',
		password: 'admin'
});
}