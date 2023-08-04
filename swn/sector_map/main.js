import './style.css'
import * as bod from 'body.js';
import * as th from 'node_modules/three';
import {OrbitControls} from 'node_modules/three/examples/jsm/controls/OrbitControls.js'

const scene = new th.Scene();
const camera = new th.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const rendo = new th.WebGLRenderer(
  {canvas: document.querySelector('#bg')
});
rendo.setPixelRatio(window.devicePixelRatio);
rendo.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( rendo.domElement );

// Adding texture background
const texture = new th.TextureLoader().load('moon.jpg');
//scene.background = texture;

const geometry = new th.BoxGeometry( 1, 1, 1 );
const material = new th.MeshBasicMaterial( { color: 0xffffff } );
const cube = new th.Mesh( geometry, material );
//scene.add( cube );

const sun = new bod.Body("sun", 2, 0, texture);
const sunMesh = sun.getMesh()
scene.add(sunMesh);

camera.position.set(0,5,10);

const pointLight = new th.PointLight(0xffffff, 100, 0, 3);
pointLight.position.set(5,5,0);
const lightHelper = new th.PointLightHelper(pointLight);
const ambientLight = new th.AmbientLight();
scene.add(ambientLight);

const gridHelper = new th.GridHelper(200, 50);
//scene.add(gridHelper);

const controls = new OrbitControls(camera, rendo.domElement);

// Populate 
function addStar() {
  const geometry = new th.SphereGeometry(0.25, 24, 24);
  const material = new th.MeshStandardMaterial({ color: 0xffffff });
  const star = new th.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => th.MathUtils.randFloatSpread(200));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

function animate() {
	requestAnimationFrame( animate );

	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;

  controls.update();

	rendo.render( scene, camera );
}



Array(200).fill().forEach(addStar)

animate();