import './style.css'
import * as bod from './body';
import * as th from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import {FlyControls} from 'three/examples/jsm/controls/FlyControls.js'

// dynamically create table from bounties list
//  -Target-  -Location-  -Reward-  -Requesting Party-  -Crime-  -Descr-
// var bounties_list = [
//     ["Eeek", "MELGOR", "150,000 cr. A / 50,000 cr. D", "I.D.G.A.F.", "ALIVE/DEAD",
//         `War General for the Jin'opian Empire. Wanted for multiple war crimes committed
//         against the IDGAF among the outer rim planets. Last known whereabouts are the Planet
//         Melgor in the Supaago System.`],
//     ["Woogledoo", "POOLEMIT", "20,000 cr. A / 15,000 cr. D", "I.D.G.A.F.", "ALIVE/DEAD",
//         `Dangerous Octoid. Wanted for maiming, mutilation, and dismemberment. Believed to be hiding
//         on Poolemit, an obscure planet of unknown atmospheric classification. Caution is highly advised.`],
//     ["Me Lucky Charms", "MARS 2", "17,300 cr.", "LUCKY THE LEPRECHAUN", "INTACT",
//         `Help! Oi cahn't foind me lahcky chahrms! Oi balieve it's taht dryshite Trix Rabbut be
//         stealin' me goods! Oi'll pay ye well for me ayght chahrms bahck, with a little extrae for
//         tee gobshite rabbut's heed. Aijajiyjajiy!`],
//     ["Torik Veld", "CORGUS NEN", "12,500 cr. A / 6,000 cr. D", "HORIZON SKY TECHNOLOGIES", "ALIVE/DEAD",
//         `Religious zealot of the 'Icarians.' Wanted for trespassing, vandalism, and destruction of
//         property. Currently hiding on Corgus Nen, precautions advised.`],
//     ["Mr. John", "SVABODNAYA", "10,000 cr. D", "ZEYRU CORP.", "DEAD",
//         `Extremely dangerous. Recommended to kill on sight. Wanted for leaking sensitive information
//         to alien organizations who are enemies to humanity. Do not attempt to get close!
//         \nReport to Zeyru Corp. headquarters on Terra Nueva for details.`],
//     ["Unknown Trio", "Unknown", "30,000 cr. A / 15,000 cr. D", "HappyHappy Fish Food Corp.", "ALIVE/DEAD",
//         `Unnamed threesome wanted for murder, theft, and destruction of the planet Dagon, 
//         Cerulian System. Considered armed and extremely dangerous.`]
        
//     //["The Flux Capacitor", "planet", "10,000 cr.", "Mr. Fusion", "INTACT", "boop bee doop"]
//     //["Giovanni Giorgio", "MORODER", "9,060 cr. A", "PAFT DUNK", "ALIVE",
//     //    `His name is Giovanni Giorgio, but everyone just calls him Giorgio.`],


//     // ["Moby Duke", "TERRA NUEVA", "8,000 cr. D", "CAPTAIN REHAB", "DEAD",
//     //     `Ai be lookin' for a steady crew to help me hunt daoon the demon what took me leg and almost
//     //     took me life! The bastard be on Dagon, but I be settin' sail from the Grand Massage Spaceport
//     //     on Terra Nueva. If ye have a stout heart and keen mind, come find me at Dock 402.`]
//     // ["Robert Olmstead", "DAGON", "15,000 cr. A", "OLMSTEAD ESTATE", "ALIVE",
//     //     `My cousin has been missing for almost three weeks. I haven't seen or heard of him since
//     //     he came back from his trip to Innsmouth on the planet Dagon. He kept muttering something
//     //     about "the deep, the deep" and "going into the water." Please see A. Olmstead on Terra Nueva
//     //     for more information.`],
// ];

// for (let i = 0; i < bounties_list.length; i++) {
//     var table = document.getElementById("bounty_table");
//     var row = table.insertRow();
//     row.addEventListener("click", showDetails.bind(this, bounties_list[i]), false);

//     for (let j = 0; j < 4; j++) {
//         row.insertCell(j).innerHTML = bounties_list[i][j];
//     }
// }



const scene = new th.Scene();
const camera = new th.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set(30,20,20);

const rendo = new th.WebGLRenderer( { canvas: document.querySelector('#bg') } );
rendo.setPixelRatio(window.devicePixelRatio);
rendo.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( rendo.domElement );

// LIGHTING
const pointLight = new th.PointLight(0xffffff, 100, 0, 3);
pointLight.position.set(5,5,0);
const lightHelper = new th.PointLightHelper(pointLight);
const ambientLight = new th.AmbientLight();
scene.add(ambientLight);


// GRIDHELPER
const gridHelper = new th.GridHelper(200, 50);
//scene.add(gridHelper);

// CONTROLS
const controls = new OrbitControls(camera, rendo.domElement);
controls.enableDamping = true;
//controls.zoomToCursor= true;
// const controls = new FlyControls(camera, rendo.domElement);
// controls.movementSpeed = 10;
// controls.rollSpeed = .5;

let intersects = []
let hovered = {}

// Adding texture background
const moonTexture = new th.TextureLoader().load('moon.jpg');
const spaceTexture = new th.TextureLoader().load('space.jpg');
const sunTexture = new th.TextureLoader().load('sun_texture.jpg');
const deadTexture = new th.TextureLoader().load('ship_texture.jpg');
const teamTexture = new th.TextureLoader().load('ship_texture.jpg');

// Create sun and planets
const solar = new bod.StarSystem('SOLAR SYSTEM', 2, ['Mercury','Venus','Earth','Mars','Jupiter', 'Saturn', 'Neptune' ,'Uranus'], 0,0,0, sunTexture, 0xf8ff27);
solar.mesh.onClick = function() { zoomToSystem(solar); };
for (let i = 0; i < solar.planetsMesh.length; i++) { scene.add(solar.planetsMesh[i]); }

const frontier = new bod.StarSystem('FRONTIER SYSTEM', 2, ['Terra Nueva'], -60,0,0, spaceTexture, 0xff5733); // RED
frontier.mesh.onClick = function() { zoomToSystem(frontier); };
for (let i = 0; i < frontier.planetsMesh.length; i++) { scene.add(frontier.planetsMesh[i]); }

const primaRelava = new bod.StarSystem('PRIMA RELAVA SYSTEM', 2, ['NH-19', 'Octurious'], -20,0,20, spaceTexture, 0x99f123); //GREEN
primaRelava.mesh.onClick = function() { zoomToSystem(primaRelava); };
for (let i = 0; i < primaRelava.planetsMesh.length; i++) { scene.add(primaRelava.planetsMesh[i]); }

const sera = new bod.StarSystem('S\'ERA SYSTEM', 2, ['Kwiki Town', 'HiDNoW', 'Mars 2'], -80,0,20, spaceTexture, 0x3374ff); //BLUE
sera.mesh.onClick = function() { zoomToSystem(sera); };
for (let i = 0; i < sera.planetsMesh.length; i++) { scene.add(sera.planetsMesh[i]); }

const zvezda = new bod.StarSystem('ZVEZDA SLAVIY SYSTEM', 2, ['Svabodnaya', 'Friendly Foe'], -80,0,-20, spaceTexture, 0xffffff); //WHITE
zvezda.mesh.onClick = function() { zoomToSystem(zvezda); };
for (let i = 0; i < zvezda.planetsMesh.length; i++) { scene.add(zvezda.planetsMesh[i]); }

const xinXian = new bod.StarSystem('XIN XIAN SYSTEM', 2, ['Chris'], 20,0,-80, spaceTexture, 0xfa93f0); //PINK
xinXian.mesh.onClick = function() { zoomToSystem(xinXian); };
for (let i = 0; i < xinXian.planetsMesh.length; i++) { scene.add(xinXian.planetsMesh[i]); }

const cerulium = new bod.StarSystem("CERULIUM SYSTEM", 2, ['Giron', 'Felon', 'Gixon', 'Dagon', 'Shuron'], -30, 0, -80, spaceTexture, 0x33e3ff); //LIGHTBLUE
cerulium.mesh.onClick = function() { zoomToSystem(cerulium); };
for (let i = 0; i < cerulium.planetsMesh.length; i++) { scene.add(cerulium.planetsMesh[i]); }

const cygnus = new bod.StarSystem("CYGNUS SYSTEM", 2, ['Veil Nebula'], -160, 0, -40, spaceTexture, 0x5dd49c); //BLUE
cygnus.mesh.onClick = function() { zoomToSystem(cygnus); };
for (let i = 0; i < cygnus.planetsMesh.length; i++) { scene.add(cygnus.planetsMesh[i]); }

const jinopian = new bod.StarSystem("JIN\'OPIAN SYSTEM", 3, ['Melgor'], -120, 0, -60, spaceTexture, 0xcd420a); //MARSRED
jinopian.mesh.onClick = function() { zoomToSystem(jinopian); };
for (let i = 0; i < jinopian.planetsMesh.length; i++) { scene.add(jinopian.planetsMesh[i]); }

const zhistaan = new bod.StarSystem("ZHISTAAN SYSTEM", 2, ['Corgus Nen', 'Poolemit'], -70, 0, -80, spaceTexture, 0x2e8e57); //GREEN
zhistaan.mesh.onClick = function() { zoomToSystem(zhistaan); };
for (let i = 0; i < zhistaan.planetsMesh.length; i++) { scene.add(zhistaan.planetsMesh[i]); }

scene.add(solar.mesh, frontier.mesh, primaRelava.mesh, sera.mesh, zvezda.mesh, xinXian.mesh, cerulium.mesh,
  cygnus.mesh, jinopian.mesh, zhistaan.mesh);


// Team Location
const teamMesh = new th.Mesh(new th.CylinderGeometry(1, 1, .25, 3), new th.MeshBasicMaterial({color: 0xff9900, map: teamTexture}));
teamMesh.position.set(-80, 2, -20);
teamMesh.rotation.y = 1.8
scene.add(teamMesh);


// dead ship
const deadGeom =  new th.CylinderGeometry(.5, .5, 2, 7, 10)
const deadMesh = new th.Mesh(deadGeom, new th.MeshBasicMaterial({color: 0xaaaaaa, map: deadTexture}) )
deadMesh.position.set(-72, 1, -6)
deadMesh.rotation.x = Math.PI / 2
const deadEdges = new th.EdgesGeometry(deadGeom)
const deadMeshLines = new th.LineSegments(deadEdges, new th.LineBasicMaterial({color: 0x000000}))
deadMeshLines.position.set(
	deadMesh.position.x,
	deadMesh.position.y,
	deadMesh.position.z)
deadMeshLines.rotation.x = deadMesh.rotation.x
scene.add(deadMesh, deadMeshLines)



// RAYCASTING TO CLICK ON PLANETS
const mouse = new th.Vector2();
const raycaster = new th.Raycaster();


// TRYING TO GET ONCLICK TO WORK

window.addEventListener('mousemove', (e) => {
	mouse.set((e.clientX / window.innerWidth) * 2 - 1, -(e.clientY / window.innerHeight) * 2 + 1);
	raycaster.setFromCamera(mouse, camera);
	intersects = raycaster.intersectObjects(scene.children);

	Object.keys(hovered).forEach((key) => {
		const hit = intersects.find((hit) => hit.object.uuid === key)
		if (hit === undefined) {
			const hoveredItem = hovered[key];
			if (hoveredItem.object.onPointerOver) hoveredItem.object.onPointerOut(hoveredItem);
			delete hovered[key];
		}
	})

	intersects.forEach((hit) => {
		if (!hovered[hit.object.uuid]) {
			hovered[hit.object.uuid] = hit
			if (hit.object.onPointerOver) hit.object.onPointerOver(hit);
		}
		if (hit.object.onPointerMove) hit.object.onPointerMove(hit);
	})
})

window.addEventListener('click', (e) => {
	intersects.forEach((hit) => {
		if (hit.object.onClick) hit.object.onClick(hit)
	})
})



// POPULATE SPACE WITH STARS 
function addStar() {
  const star = new th.Mesh( new th.SphereGeometry(0.25, 24, 24), new th.MeshStandardMaterial({ color: 0xffffff }));
  const [x, y, z] = Array(3).fill().map(() => th.MathUtils.randFloatSpread(500));
  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

//const earthRotate = 2 * Math.PI * (1/60) * (1/60);

const planets = [solar, frontier, primaRelava, sera, zvezda, xinXian, cerulium, cygnus, jinopian, zhistaan]


// Clicking on a planet zooms to the planet. Ideally this would be a smooth animation, but rn just jumps
document.getElementById("liSolar").addEventListener('click', () => {zoomToSystem(solar)})
document.getElementById("liPrimaRelava").addEventListener('click', () => {zoomToSystem(primaRelava)})
document.getElementById("liFrontier").addEventListener('click', () => {zoomToSystem(frontier)})
document.getElementById("liSera").addEventListener('click', () => {zoomToSystem(sera)})
document.getElementById("liZvezda").addEventListener('click', () => {zoomToSystem(zvezda)})
document.getElementById("liXinXian").addEventListener('click', () => {zoomToSystem(xinXian)})
document.getElementById("liCerulium").addEventListener('click', () => {zoomToSystem(cerulium)})
document.getElementById("liZhistaan").addEventListener('click', () => {zoomToSystem(zhistaan)})
document.getElementById("liJinOpian").addEventListener('click', () => {zoomToSystem(jinopian)})
document.getElementById("liCygnus").addEventListener('click', () => {zoomToSystem(cygnus)})

var hover = true

function animate() {
	requestAnimationFrame( animate );
    controls.update(.05);

	// Animate planets orbitting their stars
	for (let i = 0; i < planets.length; i++) {
		for (let j = 0; j < planets[i].planetsMesh.length; j++) {
			planets[i].planetsMesh[j].rotation.y += .01/j;
		}
	}


	if (hover) {
		if (teamMesh.position.y < 2.25) {
			teamMesh.position.y += 0.005;
		}
		else {
			hover = false;
		}
	}
	else {
		if (teamMesh.position.y > 2) {
			teamMesh.position.y -= .005;
		}
		else {
			hover = true;
		}
	}


	rendo.render( scene, camera );
}


// Clicking on the system table pops up info
const systemDataDialog = document.getElementById("systemData");
const closeInfoButton = document.getElementById("closeInfo");
closeInfoButton.addEventListener('click', () => { systemDataDialog.close(); })
const systemName = document.getElementById("systemName");
const planetsTable = document.getElementById("planetsTable");


function zoomToSystem(system) {
  
  controls.target.set(system.mesh.position.x, system.mesh.position.y, system.mesh.position.z);
  camera.position.set(system.mesh.position.x + 15, system.mesh.position.y + 15, system.mesh.position.z + 15);
  controls.update();
  // add popup for system details
  planetsTable.innerHTML = ""
  planetsTable.insertRow().innerHTML = "-PLANETS / POINTS OF INTEREST-"

  for (let j = 0; j < system.planets.length; j++) {
	var row = planetsTable.insertRow();
	row.innerHTML = system.planets[j];
  }
  systemName.innerHTML = system.name
  systemDataDialog.showModal();
};

// Reset View to earth's solar system
const resetButton = document.getElementById("resetBtn");
resetButton.onclick = function() {
  controls.reset();
  controls.update();
};

// Moves camera to team position
const findTeamButton = document.getElementById("findTeamBtn");
findTeamButton.onclick = function() {
  controls.target.set(teamMesh.position.x, teamMesh.position.y, teamMesh.position.z);
  camera.position.set(teamMesh.position.x + 15, teamMesh.position.y + 20, teamMesh.position.z + 15);
  controls.update();
};

// Pop up window for Bounty Board table.
const bountyBoard = document.getElementById("bountyboard");
const bountyBoardButton = document.getElementById("showBB");
const closeBBButton = document.getElementById("closeBB");
const closeBBDetailsButton = document.getElementById("closeBBDetails")
bountyBoardButton.addEventListener('click', () => {
	bountyBoard.showModal();
})
closeBBButton.addEventListener('click', () => {
	bountyBoard.close();
})
closeBBDetailsButton.addEventListener('click', () => {
	document.getElementById("details_popup").style.display = "none";
	document.getElementById("target_img").src = "";
})


animate();















// /////////
// import * as THREE from 'three'
// import './styles.css'

// class Cube extends THREE.Mesh {
//   constructor() {
//     super()
//     this.geometry = new THREE.BoxGeometry()
//     this.material = new THREE.MeshStandardMaterial({ color: new THREE.Color('orange').convertSRGBToLinear() })
//     this.cubeSize = 0
//     this.cubeActive = false
//   }

//   render() {
//     this.rotation.x = this.rotation.y += 0.01
//   }

//   onResize(width, height, aspect) {
//     this.cubeSize = (height * aspect) / 5
//     this.scale.setScalar(this.cubeSize * (this.cubeActive ? 1.5 : 1))
//   }

//   onPointerOver(e) {
//     this.material.color.set('hotpink')
//     this.material.color.convertSRGBToLinear()
//   }

//   onPointerOut(e) {
//     this.material.color.set('orange')
//     this.material.color.convertSRGBToLinear()
//   }

//   onClick(e) {
//     this.cubeActive = !this.cubeActive
//     this.scale.setScalar(this.cubeSize * (this.cubeActive ? 1.5 : 1))
//   }
// }

// // state
// let width = 0
// let height = 0
// let intersects = []
// let hovered = {}

// // setup
// const scene = new THREE.Scene()
// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
// camera.position.z = 5
// const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
// renderer.setPixelRatio(Math.min(Math.max(1, window.devicePixelRatio), 2))
// renderer.toneMapping = THREE.ACESFilmicToneMapping
// renderer.outputEncoding = THREE.sRGBEncoding
// document.getElementById('root').appendChild(renderer.domElement)
// const raycaster = new THREE.Raycaster()
// const mouse = new THREE.Vector2()

// // view
// const cube1 = new Cube()
// cube1.position.set(-1.5, 0, 0)
// const cube2 = new Cube()
// cube2.position.set(1.5, 0, 0)
// scene.add(cube1)
// scene.add(cube2)


// // responsive
// function resize() {
//   width = window.innerWidth
//   height = window.innerHeight
//   camera.aspect = width / height
//   const target = new THREE.Vector3(0, 0, 0)
//   const distance = camera.position.distanceTo(target)
//   const fov = (camera.fov * Math.PI) / 180
//   const viewportHeight = 2 * Math.tan(fov / 2) * distance
//   const viewportWidth = viewportHeight * (width / height)
//   camera.updateProjectionMatrix()
//   renderer.setSize(width, height)
//   scene.traverse((obj) => {
//     if (obj.onResize) obj.onResize(viewportWidth, viewportHeight, camera.aspect)
//   })
// }

// window.addEventListener('resize', resize)
// resize()

// // events
// window.addEventListener('pointermove', (e) => {
//   mouse.set((e.clientX / width) * 2 - 1, -(e.clientY / height) * 2 + 1)
//   raycaster.setFromCamera(mouse, camera)
//   intersects = raycaster.intersectObjects(scene.children, true)

//   // If a previously hovered item is not among the hits we must call onPointerOut
//   Object.keys(hovered).forEach((key) => {
//     const hit = intersects.find((hit) => hit.object.uuid === key)
//     if (hit === undefined) {
//       const hoveredItem = hovered[key]
//       if (hoveredItem.object.onPointerOver) hoveredItem.object.onPointerOut(hoveredItem)
//       delete hovered[key]
//     }
//   })

//   intersects.forEach((hit) => {
//     // If a hit has not been flagged as hovered we must call onPointerOver
//     if (!hovered[hit.object.uuid]) {
//       hovered[hit.object.uuid] = hit
//       if (hit.object.onPointerOver) hit.object.onPointerOver(hit)
//     }
//     // Call onPointerMove
//     if (hit.object.onPointerMove) hit.object.onPointerMove(hit)
//   })
// })

// window.addEventListener('click', (e) => {
//   intersects.forEach((hit) => {
//     // Call onClick
//     if (hit.object.onClick) hit.object.onClick(hit)
//   })
// })

// // render-loop, called 60-times/second
// function animate(t) {
//   requestAnimationFrame(animate)
//   scene.traverse((obj) => {
//     if (obj.render) obj.render(t)
//   })
//   renderer.render(scene, camera)
// }

// animate()
