const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const ResourceSchema = new Schema({
	name : { type : String , required : true },
	slug : { type : String },
	color : { type : String }
});

ResourceSchema.plugin(require('mongoose-lifecycle'));

const Resource = Mongoose.model('resource', ResourceSchema);
export {
	Resource
};