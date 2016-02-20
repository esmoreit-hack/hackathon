const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const InstanceSchema = new Schema({
	name : { type : String , required : true },
	slug : { type : String },
	activeFrom : { type : Date , required : true },
	activeTo : { type : Date , required : true },
});

const Instance = Mongoose.model('instance', InstanceSchema);

export {
	Instance
};