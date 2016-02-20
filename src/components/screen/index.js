import { createStore, combineReducers } from 'redux';
import { Component } from './../../libs/';
import _template from './index.html';
import THREE from 'three';


const ScreenStore = (state = 'SHOW_ALL', action) => {
  switch (action.type) {
    case 'ACTION':
      return action.value;
    default:
      return state;
  }
};

class Screen extends Component {

  firstRender=true;
  events={
    'after:render': () => {
      if(this.firstRender){
        this.firstRender = false;
        this.renderScene(el)
      }
    }
  };

  constructor(data, el) {
    super(_template, createStore(ScreenStore), el);
  }

  renderScene(el) {
    this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
    this.camera.position.z = 400;
    this.scene = new THREE.Scene();
    this.mesh = this.getCube(200);
    this.scene.add(this.mesh);
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    el.appendChild(this.renderer.domElement);
    window.addEventListener('resize', () => {this.onWindowResize();}, false);
    this.animate();
  }

  getCube(size){
    let geometry = new THREE.BoxGeometry(size, size, size);
    let material = new THREE.MeshBasicMaterial({ wireframe: true });
    return new THREE.Mesh(geometry, material);
  };

  onWindowResize(){
		this.camera.aspect = window.innerWidth / window.innerHeight;
		this.camera.updateProjectionMatrix();
		this.renderer.setSize( window.innerWidth, window.innerHeight );
  }

  animate(){
		requestAnimationFrame( () => {
      this.animate();
    });
		this.mesh.rotation.x += 0.005;
		this.mesh.rotation.y += 0.01;
		this.renderer.render( this.scene, this.camera );
  }
}

export {
  Screen
};
