'use strict';

import {Planet} from './planet';
const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const PlanetModel = new Planet;


const InstanceSchema = new Schema({
	name : { type : String , required : true },
	slug : { type : String },
	activeFrom : { type : Date },
	activeTo : { type : Date },
	maxPlayers : { type : Number, default : 0 },
	freeGalaxies : { type : 'array' , "items": { "type": Number} },
	teamRed : { "type": "array" , "items": { "type": ObjectId, "ref" : 'User' }, default : [] },
	teamBlu : { "type": "array" , "items": { "type": ObjectId, "ref" : 'User' }, default : [] },
	teamGray : {"type": "array" , "items": { "type": ObjectId, "ref" : 'User' }, default : []},
	gameData : {"type": "array" , "items": { "type": ObjectId, "ref" : 'TurnHash' }, default : []}
});

InstanceSchema.plugin(require('mongoose-lifecycle'));


InstanceSchema.methods.initilizateGame = (instance) => {
	PlanetModel.saveAllPlanets(instance, (response) => {
		console.log(response);
	});
};

InstanceSchema.methods.assignPlanet = (user, cb) => {
	Instance.findOne({ $or : [{ teamBlu : user._id }, { teamRed : user._id }] }).exec((err, instance) => {
		PlanetModel.assignOne(instance, user, (user) => {
			cb(user);
		})
	})
};

InstanceSchema.methods.calculateTeams = (instance, user) => {
	let teamRed = JSON.stringify(instance.teamRed);
	let teamBlu = JSON.stringify(instance.teamBlu);
	if(teamRed.indexOf(user._id) !== -1 || teamBlu.indexOf(user._id) !== -1 )
		return 'already in game';

	if(instance.teamRed && instance.teamBlu && teamRed.length <= teamBlu.length){
		instance.teamRed.push(user._id);
	} else instance.teamBlu.push(user._id);

	return instance.save();
};

InstanceSchema.methods.findGame = (user, cb) => {
	//this is wrong, we should count the number of user per team not the maximum
	Instance.findOne( { $where : "this.teamRed.length < 30 && this.teamBlu.length < 30" }, (err, instance) => {
		if(err) return err;
		var newInstance = InstanceSchema.methods.calculateTeams(instance, user);
		cb('ingame');
	});

};

let Instance = Mongoose.model('instance', InstanceSchema);

Instance.on('beforeInsert', (instance) => {
	InstanceSchema.methods.initilizateGame(instance._id);
  	console.log('A new instance "%s" was created', instance.slug);
});

export {
	Instance
};