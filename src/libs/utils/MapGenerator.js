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

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  getRandomCubePosition(callback){
    function cartesian() {
    var r = [], arg = arguments, max = arg.length-1;
        function helper(arr, i) {
            for (var j=0, l=arg[i].length; j<l; j++) {
                var a = arr.slice(0); // clone arr
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


    let y = cartesian([0], [1], [2]);

    console.log('random cubelv2', y);
    if(callback)
      callback([y]);
  }

  getGalaxy(moltiplier){
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
    const first = moltiplier;
    const second = 1 + moltiplier;
    const thrid = -1 - moltiplier;
    let cubelv2 = cartesian([first, second, thrid], [thrid, first, second], [second, thrid, first]);

    Array.prototype.getRandom= function(num, cut){

      var A= cut? this:this.slice(0);

      A.sort(function(){
          return .5-Math.random();
      });
      return A.splice(0, num);
    };

    let planets = cubelv2.getRandom(7);


    return { planets: planets };
  }

  getPlanet(){
    let planet = {};
    let calculate = {};

    this.getRandomCubePosition( calculate = (vector3) => {
      console.log(vector3);
      if(spacesFilled.length > 0) {
        spacesFilled.forEach((Unit) => {
          if (Unit[0] === vector3[0] && Unit[1] === vector3[1] && Unit[2] === vector3[2]) {
            calculate();
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

    return (planet) ? planet : calculate();
  }

  getGalaxie(cubeNumber, minPlanets, maxPlanets){
    let galaxies = [];

    for(let i=0; i<cubeNumber; i++){
      galaxies.push([ i , this.getGalaxy(i)]);
    }

    return { galaxies: galaxies};
  }

  getGame(){
    let cubeNumber = 27;
    let minPlanets = 5;
    let maxPlanets = 5;

    cubeNumber = cubeNumber || 27;
    for(let i=0; i<cubeNumber; i++){
      res.push(this.getGalaxie(cubeNumber, minPlanets, maxPlanets));
    }
    return { universes: res };
  }

};

let Map = new MapGenerator();
