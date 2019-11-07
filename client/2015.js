import datatables from 'datatables.net';
import datatables_bs from 'datatables.net-bs';
import 'datatables.net-bs/css/dataTables.bootstrap.css';
import './2015.html';
Template.Y2015.onRendered(function() {
	datatables(window, $);
	datatables_bs(window, $);

	var data = [];
	Meteor.call("getYearlyData",'2015', function (error, response) {
		if (error) {
			console.log('error', error);
			return;
		}

		else {
			console.log(response);
			$('#mytable').DataTable({
				responsive: true,
				data : response,
				"columns": [
					{ "data": "_id" ,"title": "ID"},
					{ "data": "active" ,"title": "Active"},
					{ "data": "active_date","title": "Active Date", "type":'datetime',
				 },
					{ "data": "expiry_date" ,"title": "ExpiryDate"},
				]
			});
		}
	});
 
   

});

Template.Y2015.helpers({
	
});