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

  getGalaxy(multiplier, numPlanets){
    function cartesian() {
      var r = [], arg = arguments, max = arg.length-1;
      function helper(arr, i) {
        for (var j=0, l=arg[i].length; j<l; j++) {
          var a = arr.slice(0);
          a.push(arg[i][j]);
          if (i==max)
            r.push(a);
          else
            helper(a, i+1);
        }
      }
      helper([], 0);
      return r;
    }
    const first = multiplier;
    const second = 1 + multiplier;
    const thrid = -1 - multiplier;
    let galaxy = cartesian([first, second, thrid], [thrid, first, second], [second, thrid, first]);

    Array.prototype.getRandom= function(num, cut){

      var A= cut? this:this.slice(0);

      A.sort(function(){
          return .5-Math.random();
      });
      return A.splice(0, num);
    };

    let planets = galaxy.getRandom(numPlanets);
    let number = JSON.stringify(parseInt(multiplier));

    return { galaxy, planets: planets };
  }

  getGalaxie(cubeNumber, numPlanets){
    let galaxies = [];

    for(let i=0; i<cubeNumber; i++){
      galaxies.push([i, this.getGalaxy(i, numPlanets)]);
    }

    return { galaxies: galaxies};
  }

  getGame(){
    let cubeNumber = 27;
    let numPlanets = 12;

    cubeNumber = cubeNumber || 27;
    for(let i=0; i<cubeNumber; i++){
      res.push(this.getGalaxie(cubeNumber, numPlanets));
    }
    return { universes: res };
  }

};

let Map = new MapGenerator();
