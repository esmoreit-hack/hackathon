const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const EmpireSchema = new Schema({
    player : { type : ObjectId , ref : 'User'}
});

const Empire = Mongoose.model('empire', EmpireSchema);

export {
	Empire
};