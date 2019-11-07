import { Template } from 'meteor/templating';

import './main.html';
import './route.js';
import './dashboard.js';
import './2015.js';
import './2016.js';
import './addform.js';


Template.navbar.events({
  'click .nav>li'(event, instance) {
    // $(".nav>li").removeClass("active");
    // $(event.currentTarget).addClass("active");
   // var routetemplate=$(event.currentTarget).find("a").attr('route-data')
   // Router.go(routetemplate)
  }
});


Meteor.call("getAllData",function (error, response) {
  console.log('error', error);
  console.log('response', response);
});