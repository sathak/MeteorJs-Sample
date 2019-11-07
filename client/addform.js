import './addform.html';
Template.addform.onRendered(function() {
	this.$('#_adatepicker').datepicker();
	this.$('#_edatepicker').datepicker();
});

Template.addform.helpers({
	// items: function(){
	// 	var postId = FlowRouter.current().params.postId;
	// 	if(postId) return [Items.findOne(postId)];
	// 	else return Items.find();
	// }
});

Template.addform.events({
    'submit .new-task'(event) {
		// Prevent default browser form submit
		event.preventDefault();
	 
		// Get value from form element
		const target = event.target;
		var _active = target.active.value;
		var _active_date = target.active_date.value;
		var _expiry_date = target.expiry_date.value;
	 
		// Insert a task into the collection
		Meteor.call("InsertRecord",_active,_active_date,_expiry_date, function (error, response) {
			if (error) {
				console.log('error', error);
				return;
			}

			else {
				console.log(response);
				alert("Sucessfully Document Inserted...");
				// Clear form
		target.active.value = '';
		// Clear form
		target.active_date.value = '';
		// Clear form
		target.expiry_date.value = '';
			}
		});
	 
		
	  },
});