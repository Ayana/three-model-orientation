import React from 'react';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import MODEL from './assets/model.obj';

const ThreeScene2 = () => {
  let container, scene, camera, renderer;

  function init() {
    // container = document.querySelector('.scene');

    scene = new THREE.Scene();

    // Camera setting
    const fov = 45;
    const aspect = window.clientWidth / window.clientHeight;
    const near = 1;
    const far = 1000;

    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

    camera.position.set(0, 0, 60);

    // Add light
    // const ambientLight = new THREE.AmbientLight(0xcccccc, 0.4);
    // scene.add(ambientLight);

    // useEffect(() => {
    // window.addEventListener('resize', () => {
    //   renderer.setSize(window.innerWidth, window.innerHeight);
    //   camera.aspect = window.innerWidth / window.innerHeight;
    //   camera.updateProjectionMatrix();
    // });
    // });

    // Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.clientWidth, window.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    document.body.appendChild(renderer.domElement);

    // Load model
    const loader = new OBJLoader();
    loader.load(MODEL, function(object) {
      scene.add(object);

      renderer.render(scene, camera);
    });
  }

  init();

  return <div />;
  // return <div className='scene'></div>;
};

export default ThreeScene2;
