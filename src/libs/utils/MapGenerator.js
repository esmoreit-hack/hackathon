"use strict";

class MapGenerator{

  constructor( cubeNumber ){
    this.areas = [];
    this.cubes = [];
    cubeNumber = 3;

    let _originalCubeNumber = cubeNumber;
    for(let i = 1; i < _originalCubeNumber; i++){
      cubeNumber = Math.pow(cubeNumber, _originalCubeNumber);
    }

    console.log(cubeNumber);

    // let limit = cubeNumber;
    // for(let i = 1; i < limit; i++){
    //   this.createCube(i, _originalCubeNumber);
    // }
  }

  getPosition(id, cubeNumber){
    let res = [];
    for(let temp=[], i = 1; i < cubeNumber;i++){
      res.push(((i+1)%cubeNumber ? *-1 : *1)(id%2));
    }

  }

  getPlanet(){

  }

  getUnit(){

  }

  createCube(id, cubeNumber){
    // let position = this.getPosition(id,cubeNumber);
    // this.cubes.push([])
  }

};

let Map = new MapGenerator();
