Template.layout.helpers({
	user : function() {
		if(!! Meteor.user()) {
			console.log(Meteor.user());
			return Meteor.user().username;
		} else {
			return 'Not logged in!';
		}
	}
});