"use strict";
const fs = require('fs');

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
    let _pp = planet;
    for(let i = 0; i < constellation.length; i++){
      let _p = constellation[i];
      if((_p[0] === _pp[0]) && (_p[1] === _pp[1]) && (_p[2] === _pp[2]) ){
        return false;
      }
      continue;
    }
    return true;
  }

  getRandomCubePosition(){
    var c = ()=> { return Math.round(Math.random()); };
    let x = c() ? (-1*c()) : c();
    let y = c() ? (-1*c()) : c();
    let z = c() ? (-1*c()) : c();
    return [x,y,z];
  }

  getPlanet(constellation){
    let pos = this.getRandomCubePosition();
    let planet = { position: pos };
    return this.validatePlanetConstellation( constellation, pos ) ? planet : this.getPlanet(constellation);
  }

  getConstellation(minPlanets, maxPlanets){
    minPlanets = minPlanets || 5;
    maxPlanets = (maxPlanets === false ) ? false : maxPlanets || 7;
    let max = !maxPlanets ? minPlanets : Math.round(Math.random(minPlanets,maxPlanets)*10);
    let res = [];
    for(let i=0; i<max; i++){
      res.push(this.getPlanet(res));
    }
    return { planets: res };
  }

  getGalaxie(cubeNumber, minPlanets, maxPlanets){
    let res = [];
    cubeNumber = cubeNumber || 27;
    for(let i=0; i<cubeNumber; i++){
      res.push(this.getConstellation( minPlanets, maxPlanets ));
    }
    return { constellations: res };
  }

  getGame(cubeNumber, minPlanets, maxPlanets){
    cubeNumber = cubeNumber || 27;
    minPlanets = minPlanets || 7;
    maxPlanets = false;

    let res = [];
    cubeNumber = cubeNumber || 27;
    for(let i=0; i<cubeNumber; i++){
      res.push(this.getGalaxie(cubeNumber, minPlanets, maxPlanets));
    }
    return { galaxies: res };
  }

};

let Map = new MapGenerator();
