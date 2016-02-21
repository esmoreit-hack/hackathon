'use strict';

import {Instance} from './instance';
const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const InstanceModel = new Instance;

const UserSchema = new Schema({
    username: { type : String, required : true },
    empire : { type : ObjectId , ref : 'Empire'},
    startingGalaxy : { type : Number },
    status : { type : String, enum : ['online', 'offline', 'afk', 'queue', 'ingame' ], default : 'afk'}

});

UserSchema.plugin(require('mongoose-lifecycle'));
const User = Mongoose.model('user', UserSchema);

User.on('afterUpdate', (user) => {
	if(user.status === 'queue'){
		InstanceModel.findGame(user, (newStatus) => {
			if(newStatus) {
				user.status = newStatus;

				InstanceModel.assignPlanet(user, (response) => {

				response.save();
				});
			}
		});
	}
});

User.on('afterCreate', (user) => {
  	console.log('A new user is in "%s"', user.status);
});

export {
    User
};