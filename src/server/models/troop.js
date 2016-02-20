const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const TroopSchema = new Schema({
	army : { type : ObjectId , ref : 'Army' },
    station : { type : ObjectId , ref : 'Planet' },
    strenght : { type : Number, default : 1 },
    defense : { type : Number, default : 1 },
    health : { type : Number, default : 1 },
    speed : { type : Number, default : 1 },
    moving : { type : Boolean , default : false },
    movingTo : { type : ObjectId , ref : 'Planet' }
});

const Troop = Mongoose.model('troop', TroopSchema);

export {
	Troop
};