import './style.css'
import * as bod from './body'
import * as th from 'three';
import * as bl from './ball';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import {MapControls} from 'three/examples/jsm/controls/MapControls.js'

// const scene = new th.Scene();
// const camera = new th.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

// const renderer = new th.WebGLRenderer();
// renderer.setSize( window.innerWidth, window.innerHeight );
// document.body.appendChild( renderer.domElement );

// camera.position.set(0,15,15);

// const spaceText = new th.TextureLoader().load('space.jpg');
// const sun = new bod.StarSystem('Solar', 3, 4, 10, 0, 0, spaceText, 0x00ddff);
// scene.add(sun.mesh);

// for (let i = 0; i < sun.planetsMesh.length; i++) {
// 	scene.add(sun.planetsMesh[i]);
// }

// const mouse = new th.Vector2();
// const raycaster = new th.Raycaster();

// const onMouseMove = (event) => {
// 	mouse.set((e.clientX / width) * 2 - 1, -(e.clientY / height) * 2 + 1)
// 	raycaster.setFromCamera(mouse, camera);
// 	const inters = raycaster.intersectObjects(scene.children);

// 	if (inters.length > 0) { inters[0].object.material.color.set(0xdddfa1); }
// }

// window.addEventListener('mousemove', onMouseMove);


// // LIGHT
// const ambLight = new th.AmbientLight();
// scene.add(ambLight);

// const grid = new th.GridHelper(200, 50);
// scene.add(grid);

// CONTROLS
//const controls = new OrbitControls(camera, renderer.domElement);




// // class Ball extends th.Mesh {
// // 	constructor() {
// // 		super()
// // 		this.geometry = new th.SphereGeometry()
// // 		this.material = new th.MeshPhongMaterial({color: 0x897abc})
// // 		this.size = 10
// // 		this.ballActive = false;
// // 		this.color = 0xff33ec

// // 	}

// // 	onMouseOver(e) { this.material.color.set(0xffffff); }

// // 	onMouseOut(e) { this.material.color.set(this.color) }

// // 	onClick(e) {
// // 		this.ballActive = !this.ballActive;
// // 		controls.target.set(this.position.x, this.position.y, this.position.z);
// // 		camera.position.set(this.position.x + 15, this.position.y + 20, this.position.z - 10);
// //   		controls.update();
// // 	}
// // }


// let hovered = {}
// let intersects = []


// const planet1 = new bl.Ball();
// planet1.onClick = function() {
// 	controls.target.set(this.position.x, this.position.y, this.position.z);
// 	camera.position.set(this.position.x + 15, this.position.y + 20, this.position.z - 10);
// 	controls.update();
// 	document.getElementById('kapow').setAttribute("display", "block");
// }
// planet1.position.set(5,0,0);
// scene.add(planet1);


// window.addEventListener('mousemove', (e) => {
// 	mouse.set((e.clientX / window.innerWidth) * 2 - 1, -(e.clientY / window.innerHeight) * 2 + 1);
// 	raycaster.setFromCamera(mouse, camera);
// 	intersects = raycaster.intersectObjects(scene.children);

// 	Object.keys(hovered).forEach((key) => {
// 		const hit = intersects.find((hit) => hit.object.uuid === key)
// 		if (hit === undefined) {
// 			const hoveredItem = hovered[key];
// 			if (hoveredItem.object.onPointerOver) hoveredItem.object.onPointerOut(hoveredItem);
// 			delete hovered[key];
// 		}
// 	})

// 	intersects.forEach((hit) => {
// 		if (!hovered[hit.object.uuid]) {
// 			hovered[hit.object.uuid] = hit
// 			if (hit.object.onPointerOver) hit.object.onPointerOver(hit);
// 		}
// 		if (hit.object.onPointerMove) hit.object.onPointerMove(hit);
// 	})
// })

// window.addEventListener('click', (e) => {
// 	intersects.forEach((hit) => {
// 		if (hit.object.onClick) hit.object.onClick(hit)
// 	})
// })




// function animate() {
// 	requestAnimationFrame( animate );

// 	//group.rotation.x += 0.01;
//   	// blueGroup.rotation.y += 0.005;
// 	// group.rotation.y += 0.01;
  	
// 	// sun.mesh.rotation.y += 0.01;
// 	// for (let i = 1; i < sun.planetsMesh.length; i++) {
// 	// 	sun.planetsMesh[i].rotation.y += .01 / i;
// 	// }
	
	
	
// 	//sunGroup.rotation.y += 0.01;
	

// 	controls.update();
// 	renderer.render( scene, camera );
// }

// animate();



const scene = new th.Scene();
const camera = new th.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new th.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// const controls = new FlyControls(camera, renderer.domElement);
// controls.movementSpeed = 0.2;
// controls.rollSpeed = .01;
const controls = new MapControls( camera, renderer.domElement );
controls.enableDamping = true;

const ambLight = new th.AmbientLight();
scene.add(ambLight);

const grid = new th.GridHelper(200, 50);
scene.add(grid);


const geometry = new th.BoxGeometry( 1, 1, 1 );
const material = new th.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new th.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

function animate() {
	requestAnimationFrame( animate );

	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;
	controls.update(.5)
	renderer.render( scene, camera );
}

animate();