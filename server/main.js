import { Meteor } from 'meteor/meteor';
import { YearlyCollection } from './collections';

Meteor.startup(() => {
  // code to run on server at startup
  const count = YearlyCollection.find().count();

  console.log("count :" + count);
  function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString().slice(0, 10);
  }

  Meteor.methods({
    insertRandomData: function () {
      console.log("client Called");
      YearlyCollection.remove({});
      const count = YearlyCollection.find().count();

      console.log("count :" + count);
      var arr = ["y", "n"];
      for (var i = 0; i < 40; i++) {
        var _active_date = randomDate(new Date(2015, 0, 1), new Date(2015, 11, 31));
        var _expiry_date = randomDate(new Date(2015, 0, 1), new Date(2015, 11, 31));
        var _active = arr[Math.floor(Math.random() * arr.length)];
        YearlyCollection.insert({
          active: _active,
          active_date: _active_date,
          expiry_date: _expiry_date
        })
      }
      for (var i = 0; i < 10; i++) {
        var _active_date = randomDate(new Date(2016, 0, 1), new Date(2016, 11, 31));
        var _expiry_date = randomDate(new Date(2016, 0, 1), new Date(2016, 11, 31));
        var _active = arr[Math.floor(Math.random() * arr.length)];
        YearlyCollection.insert({
          active: _active,
          active_date: _active_date,
          expiry_date: _expiry_date
        })
      }

    },
    getAllData: function () {
      return YearlyCollection.find({}).fetch();
    },
    getPieChartInfo: function () {
      var returnData = [{
        y: 0,
        name: "active",
      }, {
        y: 0,
        name: "inactive",
      }]
      returnData[0].y = YearlyCollection.find({ active: "y" }).count();
      returnData[1].y = YearlyCollection.find({ active: "n" }).count();
      return returnData;
    },
    getBarChartInfo: function (year1, year2) {
      var returnData = [{
        y: 0,
        name: year1.toString(),
        color: '#24CBE5'
      }, {
        y: 0,
        name: year2.toString(),
        color: '#FFF263'
      }]
      var year1Count = YearlyCollection.find({
        $expr: {
          $eq: [{ $year: "$active_date" }, parseInt(year1)]
        }
      }).count();

      var year2Count = YearlyCollection.find({
        $expr: {
          $eq: [{ $year: "$active_date" }, parseInt(year2)]
        }
      }).count();
      returnData[0].y = year1Count;
      returnData[1].y = year2Count;
      return returnData;
    },
    getYearlyData: function (year1) {
      return YearlyCollection.find({
        $expr: {
          $eq: [{ $year: "$active_date" }, parseInt(year1)]
        }
      }).fetch();
    },
    InsertRecord: function (_active, _active_date, _expiry_date) {
      var previousCount=YearlyCollection.find({}).count();
      YearlyCollection.insert({
        active: _active,
        active_date: _active_date,
        expiry_date: _expiry_date
      })
      var recentCount=YearlyCollection.find({}).count();
      var msg="";
      if(recentCount>previousCount){
        msg="Success";
      }
      else{
        msg="Fail";
      }
      return msg;
    }

  });


});
