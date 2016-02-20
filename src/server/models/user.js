'use strict';

const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const UserSchema = new Schema({
    username: { type : String, required : true },
    empire : { type : ObjectId , ref : 'Empire'},

});

const User = Mongoose.model('user', UserSchema);

export {
    User
};