const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const GameDataSchema = new Schema({
	hash : { type : String , required : true },
	turn : { type : Number },
	instance : { "type": ObjectId, "ref" : 'Instance' },
	actions : { "type": "array" , "items": { "type": String } }
});

GameDataSchema.plugin(require('mongoose-lifecycle'));

const GameData = Mongoose.model('gameData', GameDataSchema);
export {
	GameData
};