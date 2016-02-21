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
});

InstanceSchema.plugin(require('mongoose-lifecycle'));


InstanceSchema.methods.initilizateGame = (instance) => {
	PlanetModel.saveAllPlanets(instance, () => {
	})
}

const Instance = Mongoose.model('instance', InstanceSchema);

Instance.on('beforeInsert', (instance) => {
	InstanceSchema.methods.initilizateGame(instance._id);
  	console.log('A new instance "%s" was created', instance.slug);
});

export {
	Instance,
	InstanceSchema
};