import * as THREE from 'three';
import {TimelineMax} from 'gsap/TweenMax';
var OrbitControls = require('three-orbit-controls')(THREE);
import fragment from './fragment.glsl';
import vertex from './vertex.glsl';


var camera, pos, controls, scene, renderer, geometry, material, plane;
var mouse = {x: 0, y: 0};

function init() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerWidth);

  var container = document.getElementById('container');
  container.appendChild(renderer.domElement);

  camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.001, 100
  );
  camera.position.set( 0, 0, 1 );


  controls = new OrbitControls(camera, renderer.domElement);


  material = new THREE.ShaderMaterial( {
    extensions: {
      derivatives: '#extension GL_OES_standard_derivatives : enable',
    },
    side: THREE.DoubleSide,
    uniforms: {
      u_time: { type: 'f', value: 0 },
      u_mouse: { type: 'v2', value: new THREE.Vector2() }
    },
    wireframe: true,
    vertexShader: vertex,
    fragmentShader: fragment,
  });

  // material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );

  plane = new THREE.Mesh(new THREE.PlaneGeometry(1,1,200,200), material);
  scene.add(plane);



  resize();
  window.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  })
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

  plane.material.uniforms.u_time.value = time;
  plane.material.uniforms.u_mouse.value = new THREE.Vector2(mouse.x, mouse.y);

  requestAnimationFrame(animate);
  render();
}

function render() {
  renderer.render(scene, camera);
}

init();
animate();
