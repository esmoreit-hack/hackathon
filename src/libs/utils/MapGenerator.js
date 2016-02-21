"use strict";
const fs = require('fs');
let spacesFilled = [];
const res = [];

class MapGenerator{

  constructor( cubeNumber ){
    this.areas = [];
    this.cubes = [];
    cubeNumber = 3;

    let _originalCubeNumber = cubeNumber;
    for(let i = 1; i < _originalCubeNumber; i++){
      cubeNumber = Math.pow(cubeNumber, _originalCubeNumber);
    }
    let dest = false;
    if(process.argv.length > 3){
      dest = process.argv[2];
    }
    // console.log(process.cwd());
    dest = process.cwd()+'/dist/map.json' || dest;
    console.log(dest);
    fs.writeFile( dest, JSON.stringify(this.getGame()), (err) => {
      if (err) throw err;
      console.log('It\'s saved!');
    });
  }

  validatePlanetConstellation(constellation, planet){

    return true;
  }

  getRandomCubePosition(callback){
    var c = ()=> { return Math.round(Math.random()); };
    let x = c() ? (-1*c())  : c();
    let y = c() ? (-1*c()) : c();
    let z = c() ? (-1*c()) : c();

    if(x === -0)
      x = Math.abs(x);
    if(y === -0)
      y = Math.abs(y);
    if(z === -0)
      z = Math.abs(z);

    if(callback)
      callback([x,y,z]);
  }

  getPlanet(galaxy){
    let planet = {};

    this.getRandomCubePosition((vector3) => {

      if(spacesFilled.length > 0) {
        spacesFilled.forEach((Unit) => {
          if (Unit[0] === vector3[0] && Unit[1] === vector3[1] && Unit[2] === vector3[2]) {
            return this.getRandomCubePosition();
          } else {
            spacesFilled.push(vector3);
            planet = { position: vector3 };
          }
        });
      } else {
          spacesFilled.push(vector3);
          planet = { position: vector3 };
      }
    })

    return this.validatePlanetConstellation( galaxy ) ? planet : this.getPlanet(galaxy);
  }

  getGalaxy(minPlanets, maxPlanets){
    maxPlanets = maxPlanets ;
    let planets = [];

    spacesFilled = [];
    for(let i=0; i<maxPlanets; i++){
      planets.push(this.getPlanet());
    }

    return { planets: planets };
  }

  getGalaxie(cubeNumber, minPlanets, maxPlanets){
    let galaxies = [];

    for(let i=0; i<cubeNumber; i++){
      galaxies.push(this.getGalaxy( minPlanets, maxPlanets ));
    }

    return { galaxies: galaxies };
  }

  getGame(){
    let cubeNumber = 27;
    let minPlanets = 7;
    let maxPlanets = 7;

    cubeNumber = cubeNumber || 27;
    for(let i=0; i<cubeNumber; i++){
      res.push(this.getGalaxie(cubeNumber, minPlanets, maxPlanets));
    }
    return { universes: res };
  }

};

let Map = new MapGenerator();
