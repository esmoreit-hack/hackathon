const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const ArmySchema = new Schema({
    troops : { "type": "array" , "items": { "type": ObjectId, "ref" : 'Troop'}}
});

const Army = Mongoose.model('army', ArmySchema);

export {
	Army
};