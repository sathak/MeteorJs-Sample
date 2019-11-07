import datatables from 'datatables.net';
import datatables_bs from 'datatables.net-bs';
import 'datatables.net-bs/css/dataTables.bootstrap.css';
import './2016.html';
Template.Y2016.onRendered(function() {
	datatables(window, $);
	datatables_bs(window, $);

	var data = [];
	Meteor.call("getYearlyData",'2016', function (error, response) {
		if (error) {
			console.log('error', error);
			return;
		}

		else {
			console.log(response);
			$('#mytable').DataTable({
				data : response,
				"columns": [
					{ "data": "_id" ,"title": "ID"},
					{ "data": "active" ,"title": "Active"},
					{ "data": "active_date","title": "Active Date" },
					{ "data": "expiry_date" ,"title": "ExpiryDate"},
				]
			});
		}
	});
});

Template.Y2016.helpers({
	
});