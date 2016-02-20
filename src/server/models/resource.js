const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const ResourceSchema = new Schema({
	name : { type : String , required : true },
	slug : { type : String },
	color : { type : String }
});

const Resource = Mongoose.model('resource', ResourceSchema);

export {
	Resource
};