import map from './../../../dist/map.json';

class Map {
  constructor(unit){
    this.unit = unit;
    this.map = map;
    this.getUniverse();
  }

  parsePoint(pos){
    return (pos%2 ? 1 : 0 ) * (pos%3 ? -1 : 1);
  }

  parseCube(pos, level){
    let res = [];
    level = level || 1;
    for(let i=0; i<3;i++){
      res.push(this.parsePoint((pos+i))*(this.unit)*level);
    }
    return res;
  }

  getUniverse(){
    let cubes = [];
    for(let i=0; i<this.map.universe.length; i++){
      cubes.push(this.parseCube(i, i));
    }

    console.log(cubes);

  }

  getGalaxie(){

  }


};

export {
  Map
};
