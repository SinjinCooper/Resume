// Class for making celestial bodies.
import * as th from 'three';

// Spherical body, i.e. planets, moons
export class Body {
    constructor(name, size, xDist, zDist, face, col) {
        this.name = name;
        this.size = size;
        this.positionX = xDist;
        this.positionZ = zDist;
        this.face = face;
        if (this.mesh === undefined || this.mesh === null) {
            const geometry = new th.SphereGeometry(this.size);
            const material = new th.MeshBasicMaterial({ color: col, map: this.face });
            this.mesh = new th.Mesh(geometry, material);
            this.mesh.position.x += this.positionX;
            this.mesh.position.z += this.positionZ;
        }
    }
}


// Class to create entire systems
export class StarSystem {
    constructor(name, size, numPlanets, x, y, z, face, faceColor) {
        this.name = name;
        this.size = size;
        this.numPlanets = numPlanets;
        this.posX = x;
        this.posY = y;
        this.posZ = z;
        this.face = face;
        this.faceColor = faceColor;
        this.planetsMesh = [];

        // Create Star Mesh
        if (this.mesh === undefined || this.mesh === null) {
            this.mesh = new Body(name, size, x, z, face, faceColor).mesh
        }

        // Make Planet Meshes
        if (numPlanets != 0) {
            for (let i = 1; i <= numPlanets; i++) {
                // figure out planet size later
                const planetSize = th.MathUtils.randFloat(0.25, 1)
                const planet = new Body('Planet1', planetSize, i*5, 0, face, faceColor)
                this.planetsMesh[i] = new th.Group();
                this.planetsMesh[i].add(planet.mesh);
                this.planetsMesh[i].position.set(x,y,z)
            }
        }
    }
}


// export default class Planet {
//   constructor(radius, positionX, textureFile) {
//     this.radius = radius;
//     this.positionX = positionX;
//     this.textureFile = textureFile;
//   }

//   getMesh() {
//     if (this.mesh === undefined || this.mesh === null) {
//       const geometry = new THREE.SphereGeometry(this.radius);
//       const texture = new THREE.TextureLoader().load(this.textureFile);
//       const material = new THREE.MeshBasicMaterial({ map: texture });
//       this.mesh = new THREE.Mesh(geometry, material);
//       this.mesh.position.x += this.positionX;
//     }
//     return this.mesh;
//   }
// }