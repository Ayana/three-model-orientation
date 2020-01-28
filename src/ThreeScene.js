import React, { Component } from "react";
import * as THREE from "three";
// import MTLLoader from "three-mtl-loader";
// eslint-disable-next-line
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
// import * as OBJLoader from 'three-obj-loader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
// OBJLoader(THREE);
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js';

import MODEL from "./assets/model.obj"
import Texture from "./assets/uv_grid_opengl.jpg"


class ThreeScene extends Component {
  render() {

		let scene, camera, renderer, controls;
		let mouseX = 0, mouseY = 0;
		let windowHalfX = window.innerWidth / 2;
		let windowHalfY = window.innerHeight / 2;

    function init() {
      scene = new THREE.Scene();
      
      camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight,1,1000 );
			camera.position.z = 60;

      renderer = new THREE.WebGLRenderer({ antialias: true});
			renderer.setClearColor("#DDD")
      renderer.setSize( window.innerWidth, window.innerHeight );
			
      document.body.appendChild( renderer.domElement );
			document.addEventListener( 'mousemove', onDocumentMouseMove, false ); //For Mouse Animation
			controls = new TrackballControls( camera, renderer.domElement );

			// Add a light
			const ambientLight = new THREE.AmbientLight( 0xcccccc, 0.4 );
			scene.add( ambientLight );

			const pointLight = new THREE.PointLight( 0xffffff, 0.8 );
			camera.add( pointLight );
			scene.add( camera );

			// manager
			// function loadModel() {
			// 	object.traverse( function ( child ) {
			// 		if ( child.isMesh ) child.material.map = texture;

			// 		} );

			// 	object.position.y = - 95;
			// 	scene.add( object );
			// }

			// texture
      // const texture = new THREE.TextureLoader().load(Texture);

			// const manager = new THREE.LoadingManager( loadModel );
			// manager.onProgress = function ( item, loaded, total ) {
			// 	console.log( item, loaded, total );
			// };


			// // model
			// function onProgress( xhr ) {
			// 	if ( xhr.lengthComputable ) {
			// 		const percentComplete = xhr.loaded / xhr.total * 100;
			// 		console.log( 'model ' + Math.round( percentComplete, 2 ) + '% downloaded' );
			// 	}
			// }

			// function onError() {}
			// const loader = new OBJLoader( manager );
			// loader.load(MODEL , function ( obj ) {
			// 	object = obj;
			// }, onProgress, onError );


      // Model setting
			const loader = new OBJLoader();
			loader.load(MODEL, function(object) {
				scene.add(object);
				// myObj = object;
				object.position.z -= 0;
				// object.position.y = - 95;
				object.rotation.x = 101;

				renderer.render(scene,camera);
			});

      // // Object setting
      // const geometry = new THREE.BoxGeometry( 4, 4, 4 );
      // const texture = new THREE.TextureLoader().load('textures/crate.gif');
      // const material = new THREE.MeshBasicMaterial({ wireframe: true })
      // // const material = new THREE.MeshBasicMaterial( { color: 0x0000ff } );

      // cube = new THREE.Mesh( geometry, material );
      // scene.add( cube );

			// this.THREE = THREE;
			// const loader = new this.THREE.OBJLoader();
			// loader.load(MODEL, function(object) {
			// 	scene.add(object);
			// 	renderer.render(scene,camera);
			// }, undefined, error => {
      //     console.log(error);
      //   }
			// );
    }


		// WindowResizeOptimization
		window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize( window.innerWidth, window.innerHeight );
		})
    // // WindowResizeOptimization
    // function onWindowResize() {
    //   camera.aspect = window.innerWidth / window.innerHeight;
    //   camera.updateProjectionMatrix();
    //   renderer.setSize( window.innerWidth, window.innerHeight );
    // }

    // window.addEventListener('resize', onWindowResize, false)

		//For Mouse Animation
		function onDocumentMouseMove( event ) {
			mouseX = ( event.clientX - windowHalfX ) / 2;
			mouseY = ( event.clientY - windowHalfY ) / 2;
		}

		function animate() {
			requestAnimationFrame( animate );
			controls.update();
			
			render();
		}	

		function render() {
			camera.position.x += ( mouseX - camera.position.x ) * .05;
			camera.position.y += ( - mouseY - camera.position.y ) * .05;

			camera.lookAt( scene.position );
			renderer.render( scene, camera );
		}	
		//For Mouse Animation

    init();
    animate();//For Mouse Animation

    return (
      <div />
    )
  }
}
export default ThreeScene;
