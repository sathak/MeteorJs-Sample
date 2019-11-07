import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
const pl = new Mongo.Collection('YearlyCollection');

pl.attachSchema(new SimpleSchema({
	active: {
		type: String
	},

	active_date: {
		type: Date
	},

	expiry_date: {
		type: Date
	} 
}));


export { pl as YearlyCollection };