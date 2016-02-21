'use strict';

import map from '../../../dist/map.json';
const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const PlanetSchema = new Schema({
    owner : { type : ObjectId , ref : 'User', default : null },
    resources : { "type": "array" , "items": { "type": ObjectId, "ref" : 'Resources', "minItems": 3, "maxItems": 3}},
    troops : { "type": "array" , "items": { "type": ObjectId, "ref" : 'Troop'}, default : []},
    instance : { type : ObjectId, ref : 'Instance' , required : true },
    position : { "type": "array" , "items": { "type": "number", "minItems": 3 , "maxItems": 3 } , required : true }
});
PlanetSchema.plugin(require('mongoose-lifecycle'));

PlanetSchema.methods.assignOne = (instance, user, cb) => {
	Planet.findOne({instance : instance._id, owner : null}).exec((err, planet) => {
		planet.owner = user._id;
		planet.save((err, planetSaved) => {
			cb(user);
		});
	});
};

PlanetSchema.methods.saveAllPlanets = (instance, cb) => {
	let check = false;

	map.universes.forEach( (universe) => {
		if(!check) {
			universe.galaxies.forEach( (galaxy, index) => {
				galaxy[1].planets.forEach( (planet) => {
						check = true;
						let PlanetModel = new Planet;
					if(planet){
						PlanetModel.instance = instance;
						PlanetModel.position = planet;
						PlanetModel.save((err, newPlanet) => {
							if(err) console.log(err);

							cb('planets created');
						});
					}
				});
			});
		}
	});
};

let Planet = Mongoose.model('planet', PlanetSchema);

export {
	Planet
};