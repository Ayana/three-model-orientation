import React, { useEffect } from "react";
import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { DeviceOrientationControls } from "three/examples/jsm/controls/DeviceOrientationControls.js";

import MODEL from "./assets/model.obj";

const ThreeSceneOrientation = () => {
  let scene, camera, renderer, controls;

  function init() {
    scene = new THREE.Scene();

    // Camera setting
    const fov = 100;
    const aspect = window.innerWidth / window.innerHeight;
    const near = 0.15;
    const far = 1000;

    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0, 0, 20); //x, y, z

    // Render
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);

    // Add a light
    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 0.6);
    scene.add(pointLight);

    const light = new THREE.DirectionalLight(0x404040, 3);
    light.position.set(10, 20, 20);
    scene.add(light);

    // Model setting
    const loader = new OBJLoader();
    loader.load(MODEL, (object) => {
      object.position.set(0, -3, 0);
      scene.add(object);
      render();
    });

    controls = new DeviceOrientationControls(camera);
    // controls = new OrbitControls(camera, renderer.domElement);
    // controls.addEventListener("change", render); // use if there is no animation loop
    // controls.minDistance = 12;
    // controls.maxDistance = 400;
    // controls.target.set(0, 0, -0.2);
    // controls.update();

    window.addEventListener("resize", onWindowResize);
  }

  // Render
  function render() {
    renderer.render(scene, camera);
  }

  // WindowResizeOptimization
  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    render();
  }

  useEffect(() => {
    const container = document.querySelector(".container");
    container.appendChild(renderer.domElement);
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  init();

  return <div className="container"></div>;
};
export default ThreeSceneOrientation;
