const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const EmpireSchema = new Schema({
    player : { type : ObjectId , ref : 'User'},
    deposit : { "type": "array" , "items": { "type": ObjectId, "ref" : 'Resource' }},
    army : { "type": "array" , "items": { "type": ObjectId, "ref" : 'Army'}}
});

EmpireSchema.plugin(require('mongoose-lifecycle'));

EmpireSchema.methods.foo = () => {
	return 'foo';
}

const Empire = Mongoose.model('empire', EmpireSchema);
export {
	Empire
};