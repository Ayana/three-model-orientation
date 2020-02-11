import React, { useEffect } from 'react';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
// import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js';

import MODEL from './assets/model.obj';
// import Texture from './assets/uv_grid_opengl.jpg';
// import MODEL from './assets/model_default.obj';

const ThreeScene3 = () => {
  // let container, scene, camera, renderer, controls;
  let scene, camera, renderer, men;
  // container = document.querySelector('.scene');

  function init() {
    scene = new THREE.Scene();

    // Camera setting
    const fov = 80;
    const aspect = window.innerWidth / window.innerHeight;
    const near = 0.1;
    const far = 1000;

    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0, 2, 20); //x, y, z

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setClearColor('#DDD');
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);
    // document.addEventListener('mousemove', onDocumentMouseMove, false); //For Mouse Animation
    // controls = new TrackballControls(camera, renderer.domElement);

    // Add a light
    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 0.5);
    scene.add(pointLight);

    // Model setting
    const loader = new OBJLoader();
    loader.load(MODEL, (object) => {
      scene.add(object);
      men = object.children[0];
      object.position.set(0, 0, -10);
      animate();
    });
  }

  function animate() {
    requestAnimationFrame(animate);
    men.rotation.y += 0.01;
    renderer.render(scene, camera);
  }

  // WindowResizeOptimization
  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
  window.addEventListener('resize', onWindowResize);

  //For Mouse Animation
  // function onDocumentMouseMove(event) {
  //   mouseX = (event.clientX - windowHalfX) / 2;
  //   mouseY = (event.clientY - windowHalfY) / 2;
  // }

  // function animate() {
  //   requestAnimationFrame(animate);
  //   controls.update();

  //   render();
  // }

  // function render() {
  //   camera.position.x += (mouseX - camera.position.x) * 0.05;
  //   camera.position.y += (-mouseY - camera.position.y) * 0.05;

  //   camera.lookAt(scene.position);
  //   renderer.render(scene, camera);
  // }
  //For Mouse Animation

  init();

  return <div className='scene'></div>;
};
export default ThreeScene3;
