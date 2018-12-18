import * as THREE from 'three';
import {TimelineMax} from 'gsap/TweenMax';
var OrbitControls = require('three-orbit-controls')(THREE);
import fragment from './fragment.glsl';
import vertex from './vertex.glsl';


var camera, pos, controls, scene, renderer, geometry, material, plane;

function init() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);

  renderer = new THREE.WebGLRenderer();
  // renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerWidth);

  var container = document.getElementById('container');
  container.appendChild(renderer.domElement);

  camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.001, 100
  );
  camera.position.set( 0, 1, 1 );


  controls = new OrbitControls(camera, renderer.domElement);
  var texture = THREE.ImageUtils.loadTexture('img/wallpaper.jpeg');

  // var normal = THREE.ImageUtils.loadTexture('img/NormalMap.png');

  material = new THREE.ShaderMaterial( {
    extensions: {
      derivatives: '#extension GL_OES_standard_derivatives : enable',
    },
    side: THREE.DoubleSide,
    uniforms: {
      u_texture: { type: 't', value: texture },
      // norm: { type: 't', value: normal },
      u_resolution: { type: 'v2', value: new THREE.Vector2(window.innerWidth, window.innerWidth) },
      u_light: { type:'v3', value: new THREE.Vector3() }
    },
    vertexShader: vertex,
    fragmentShader: fragment,
  });

  // material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );

  plane = new THREE.Mesh(new THREE.PlaneGeometry(window.innerWidth,window.innerHeight,200,200), material);
  scene.add(plane);

  material.uniforms.u_light.value.z = window.innerWidth/7200;

  document.onmousemove = function(event){
    //Update the light source to follow our mouse
    material.uniforms.u_light.value.x = event.clientX;
    material.uniforms.u_light.value.y = window.innerHeight - event.clientY;
}

  resize();
}


function resize() {
  var w = window.innerWidth;
  var h = window.innerHeight;
  renderer.setSize( w, h );
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}


let time = 0;
function animate() {
  time++;


  requestAnimationFrame(animate);
  render();
}

function render() {
  renderer.render(scene, camera);
}

init();
animate();
