import './dashboard.html';
Template.dashboard.onRendered(function () {
	
});
const piechart = function() {
    // Gather data: 
		var tasksData = [];

		Meteor.call("getPieChartInfo", function (error, response) {
			if (error) {
				console.log('error', error);
				return;
			}

			else {

				tasksData = response;
				console.log('response', response);
				// Use Meteor.defer() to craete chart after DOM is ready:
				Meteor.defer(function () {
					// Create standard Highcharts chart with options:
					Highcharts.setOptions({
						colors: ['#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4']
					});
					Highcharts.chart('piechart', {

						title: {
							text: 'Active and InActive documents'
						},
						series: [{
							type: 'pie',
							data: tasksData
						}]
					});
				});
			}



		});
}
const barChart=function(){
	var tasksBarData = [];
		Meteor.call("getBarChartInfo","2015","2016", function (error, response) {
			if (error) {
				console.log('error', error);
				return;
			}

			else {
				tasksBarData = response;
				console.log('response', response);
				// Use Meteor.defer() to craete chart after DOM is ready:
				Meteor.defer(function () {
					// Create standard Highcharts chart with options:
					
					Highcharts.chart('barchart', {
						title: {
							text: 'Yearly Records'
						},
						xAxis: {
							categories: ['2015', '2016'],
							title: {
								text: null
							}
						},
						series: [{
							type: 'column',
							data: tasksBarData
						}]
					});
				});
			}
		});
}
Template.dashboard.helpers({
	createPieChart: function () {
		piechart();
	},
	createBarChart: function () {
	barChart();
	}
});

Template.dashboard.events({
  'click .radBtn'(event, instance) {
    Meteor.call("insertRandomData",function (error, response) {
     if(error){
		 console.log(error)
	 }
	 else{
		piechart();
		barChart();
	 }
    });
  }
})