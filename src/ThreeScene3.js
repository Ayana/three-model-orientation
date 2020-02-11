import React, { useEffect } from 'react';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js';

import MODEL from './assets/model.obj';
// import Texture from './assets/uv_grid_opengl.jpg';
// import MODEL from './assets/model_default.obj';

const ThreeScene3 = () => {
  // let container, scene, camera, renderer, controls;
  let scene, camera, renderer, model, controls;
  // container = document.querySelector('.scene');

  function init() {
    scene = new THREE.Scene();

    // Camera setting
    const fov = 120;
    const aspect = window.innerWidth / window.innerHeight;
    const near = 0.15;
    const far = 1000;

    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0, 0, 40); //x, y, z
    // camera.position.z = 400;

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setClearColor('#DDD');
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Add a light
    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambientLight);

    // const pointLight = new THREE.PointLight(0xffffff, 0.6);
    // scene.add(pointLight);

    const light = new THREE.DirectionalLight(0x404040, 3);
    light.position.set(10, 10, 10);
    scene.add(light);

    // Model setting
    const loader = new OBJLoader();
    loader.load(MODEL, (object) => {
      scene.add(object);
      model = object.children[0];
      object.position.set(0, -2, -2);
      animate();
      render();
    });

    controls = new OrbitControls(camera, renderer.domElement);
    controls.addEventListener('change', render); // use if there is no animation loop
    controls.minDistance = 2;
    controls.maxDistance = 10;
    controls.target.set(0, 0, -0.2);
    controls.update();

    window.addEventListener('resize', onWindowResize);
  }

  // Render
  function render() {
    renderer.render(scene, camera);
  }

  // Animate
  function animate() {
    requestAnimationFrame(animate);
    model.rotation.y += 0.01;
    render();
  }

  // WindowResizeOptimization
  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    render();
  }

  init();

  return <div className='scene'></div>;
};
export default ThreeScene3;
