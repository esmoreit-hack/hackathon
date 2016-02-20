const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const FigureSchema = new Schema({
	name : { type : String , required : true },
	slug : { type : String },
	strength : { type : Number },
	defense : { type : Number },
	health : { type : Number , default : 1},
	speed : { type : Number }
});

const Figure = Mongoose.model('figure', FigureSchema);

export {
	Figure
};