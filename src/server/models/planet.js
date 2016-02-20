const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const PlanetSchema = new Schema({
    Owner : { type : ObjectId , ref : 'Empire' },
    Resources : { "type": "array" , "items": { "type": ObjectId, "ref" : 'Resources'}},
    Troops : { "type": "array" , "items": { "type": ObjectId, "ref" : 'Troop'}},
    GameInstance : { type : ObjectId, ref : 'Instance' },
    position : { "type": "array" , "minItems": 3 , "maxItems": 3 , "items": { "type": "number" } , required : true }
});

const Planet = Mongoose.model('planet', PlanetSchema);

export {
	Planet
};