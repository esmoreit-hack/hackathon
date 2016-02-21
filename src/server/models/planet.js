'use strict';

import map from '../../../dist/map.json';
const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const PlanetSchema = new Schema({
    Owner : { type : ObjectId , ref : 'Empire', default : null },
    Resources : { "type": "array" , "items": { "type": ObjectId, "ref" : 'Resources', "minItems": 3, "maxItems": 3}, required : true},
    Troops : { "type": "array" , "items": { "type": ObjectId, "ref" : 'Troop'}, default : []},
    GameInstance : { type : ObjectId, ref : 'Instance' , required : true },
    Position : { "type": "array" , "items": { "type": "number", "minItems": 3 , "maxItems": 3 } , required : true }
});
PlanetSchema.plugin(require('mongoose-lifecycle'));

PlanetSchema.methods.saveAllPlanets = (instance) => {

	map.universes.forEach( (universe) => {
		universe.galaxies.forEach( (galaxy, index) => {
			galaxy.planets.forEach( (planet) => {
				let populated = false;
				if(!populated) {
					var vector3 = [];
					if(planet.position){
						planet.position.forEach((coord) => {
							if(vector3.length < 3){
								if(coord >= 0){
									vector3.push(coord + index);
								}else if(coord < 0){
									vector3.push(coord - index);
								}

								if(vector3.length == 3) {
									let PlanetModel = new Planet;
									PlanetModel.Resources = ['1233', '32324', '325554'];
									PlanetModel.GameInstance = instance;
									PlanetModel.Position = vector3;
									console.log(vector3);
									/*PlanetModel.save((err, newPlanet) => {
										if(err) console.log(err);

										console.log(newPlanet);
									});*/
								}
							}
						});
					}
					populated = true;
				}
			});
		});
	});
};

let Planet = Mongoose.model('planet', PlanetSchema);

export {
	Planet
};