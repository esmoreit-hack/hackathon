const Mongoose = require('mongoose'),
const Schema = Mongoose.Schema;

var UserSchema = new Schema({
    username: { type : String, required : true },
    empire : { type : ObjectId , ref : 'Empire'},
});

var user = Mongoose.model('user', UserSchema);

module.exports = {
    User: user
};