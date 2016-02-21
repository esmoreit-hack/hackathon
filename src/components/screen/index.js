import {
  createStore, combineReducers
}
from 'redux';
import {
  Component, Map
}
from './../../libs/';
import _template from './index.html';
import THREE from 'three';
import map from '../../../dist/map.json';


const ScreenStore = (state = 'SHOW_ALL', action) => {
  switch (action.type) {
    case 'ACTION':
      return action.value;
    default:
      return state;
  }
};

class Screen extends Component {

  firstRender = true;

  constructor(data, el) {
    super(_template, createStore(ScreenStore), el);
    this.on('after:render', () => {
      if (this.firstRender) {
        this.firstRender = false;
        this.renderScene(this.el);
      }
    });
  }

  addCube(unit, x, y, z) {
    let mesh = this.getCube(unit);
    mesh.position.set(x, y, z);
    this.group.add(mesh);
  }

  renderScene(el) {
    let unit = 50;
    this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
    this.camera.position.z = 500;
    this.scene = new THREE.Scene();
    this.map = new Map(unit);

    this.group = new THREE.Group();
    this.scene.add(this.group);
    this.map.getGrid().forEach((cube, i) => {
      this.addCube(unit, cube[0], cube[1], cube[2]);
    });

    this.windowHalfY = window.innerHeight/2;
    this.windowHalfX = window.innerWidth/2;


    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    el.appendChild(this.renderer.domElement);
    window.addEventListener('resize', () => {
      this.onWindowResize();
    }, false);

    document.addEventListener('mousemove', e => this.onDocumentMouseMove(e), false);
    this.animate();
  }

  getCube(size) {
    let geometry = new THREE.BoxGeometry(size, size, size);
    let material = new THREE.MeshBasicMaterial({
      wireframe: true
    });
    return new THREE.Mesh(geometry, material);
  }

  onDocumentMouseMove(event) {
    let mouseX = (event.clientX - this.windowHalfX);
    let mouseY = (event.clientY - this.windowHalfY);
		this.camera.position.x += ( mouseX - this.camera.position.x ) * 0.05;
		this.camera.position.y += ( - mouseY - this.camera.position.y ) * 0.05;
		this.camera.lookAt( this.scene.position );
    this.renderer.render(this.scene, this.camera);
  }

  onWindowResize() {
    this.windowHalfY =  window.innerHeight/2;
    this.windowHalfX = window.innerWidth/2;
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  animate() {
    requestAnimationFrame(() => {
      this.animate();
    });

    this.group.rotation.y -= 0.0005;
    this.renderer.render(this.scene, this.camera);
  }
}

export {
  Screen
};
